const path = require("path");
const { default: axios } = require("axios");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
//const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const Renderer = require("@prerenderer/renderer-jsdom");

// const SitemapPlugin = require('sitemap-webpack-plugin').default;
let { paths, LANGS } = require("./src/router/seo_routes");

const proxyConfig = require("./proxy-prod.json");
module.exports = (api, options) => {
  api.registerCommand("build:prerender", async (args) => {
    const baseURL = process.env.VUE_APP_FULL_DOMAIN;

    allPaths = [];
    paths.forEach((v) => {
      LANGS.forEach((lang) => {
        const mainPath = v.path;
        const newPath = "/" + lang.key + mainPath;
        const links = [];
        LANGS.forEach((lang2) => {
          links.push({
            lang: lang2.key,
            url: baseURL + "/" + lang2.key + mainPath,
          });
        });
        allPaths.push({
          ...v,
          path: newPath,
          links: links,
        });
      });
    });

    if (process.env.VUE_APP_DOMAIN == "bladia.com") {
      let translations = {};
      for (lang of LANGS) {
        translations[
          lang.key
        ] = require(`./src/lang/translations/${lang.key}.json`);
      }
      for (lang of LANGS) {
        const customHeaders = {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const baseUrl = process.env.VUE_APP_API_URL;

        const instance = axios.create({
          baseURL: baseUrl,
          headers: customHeaders,
        });

    
        const customBeinHeaders = {
          "content-type": "application/json",
          language: lang.key,
        };
        const beinBaseUrl = process.env.VUE_APP_BOOKING_URL;
        
        const instanceBein = axios.create({
          baseURL: beinBaseUrl,
          headers: customBeinHeaders,
        });

       // console.log("/journey?lang=" + lang.key);
        const res = await instance.get("/journey?lang=" + lang.key);

        for (const item of res.data.data) {
          // journey detail links
          let links = [];
          let mainPath = `/${translations[lang.key].ferry}/${item.company}/${item.name
            .toLowerCase()
            .split(" - ")
            .join("-")
            .split(" ")
            .join("-")}/${item.id}`;
          

          for (lang2 of LANGS) {
            links.push({
              lang: lang2.key,
              url: baseURL + "/" + lang2.key +
                `/${translations[lang2.key].ferry}/${item.company}/${item.name
                  .toLowerCase()
                  .split(" - ")
                  .join("-")
                  .split(" ")
                  .join("-")}/${item.id}`,
            });
            
          }

   

          allPaths.push({
            path: encodeURI("/" + lang.key + mainPath),
            lastmod: new Date().toISOString().slice(0, 10),
            priority: 0.8,
            changefreq: "weekly",
            links: links,
          });

          // journey schedule links
          links = [];
          mainPath = `/${translations[lang.key].hours}/${item.name
            .toLowerCase()
            .split(" - ")
            .join("-")
            .split(" ")
            .join("-")}/${item.id}`;
          for (lang2 of LANGS) {
            links.push({
              lang: lang2.key,
              url:
                baseURL +
                "/" +
                lang2.key +
                `/${translations[lang2.key].hours}/${item.name
                  .toLowerCase()
                  .split(" - ")
                  .join("-")
                  .split(" ")
                  .join("-")}/${item.id}`,
            });
          }
          allPaths.push({
            path: encodeURI("/" + lang.key + mainPath),
            lastmod: new Date().toISOString().slice(0, 10),
            priority: 0.8,
            changefreq: "daily",
            links: links,
          });
        }


        /* PORTS */
        const portRes = await instanceBein.get("/ferry/ports");
        for (const ports of portRes.data.data.items) {
          for (const item of ports) {
            const links = [];
            const mainPath = `/${
              translations[lang.key].ports
            }/${item.port.name.toLowerCase()}/${item.port._id}`;
            for (lang2 of LANGS) {
              links.push({
                lang: lang2.key,
                url:
                  baseURL +
                  "/" +
                  lang2.key +
                  `/${
                    translations[lang2.key].ports
                  }/${item.port.name.toLowerCase()}/${item.port._id}`,
              });
            }
            allPaths.push({
              path: encodeURI("/" + lang.key + mainPath),
              lastmod: new Date().toISOString().slice(0, 10),
              priority: 0.8,
              changefreq: "weekly",
              links: links,
            });
          }
        }
        
        /* END PORTS */

      }
    }

    let routes = allPaths.map((v) => v.path);
    api.chainWebpack((config) => {
      config.plugin("prerender").use(PrerenderSPAPlugin, [
        {
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),
          // Required - Routes to render.
          routes: routes,
          server: {
            ...proxyConfig,
          },
          postProcess(renderedRoute) {
            //get head of page
            let head = renderedRoute.html.match(
              /(<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>)/gi
            );
            //Remove styles and scripts in head
            head = head[0]
              .replace(
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                ""
              )
              .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

            // Add a tag to show its a server rendered page
            // vu-meta tag
            renderedRoute.html = renderedRoute.html.replace(
              "<html",
              "<html data-vue-meta-server-rendered"
            );

            //Replace head
            renderedRoute.html = renderedRoute.html.replace(
              /<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi,
              head
            );
            console.log("------------- renderedRoute ---------------");
            console.log(renderedRoute);


            return renderedRoute;
          },
          renderer: new Renderer({
            headless: false,
            renderAfterTime: 1000,
            // renderAfterDocumentEvent: 'render-event',
           maxConcurrentRoutes: 50, 
          }),
        },
      ]);

      // const sitemap = new SitemapPlugin({
      //     base: baseURL,
      //     paths: allPaths,
      //     options: {
      //         filename: 'sitemap.xml',
      //         lastmod: true,
      //         changefreq: 'hourly',
      //         priority: 0.8
      //     }
      // });
      // config.plugin('sitemap').use(sitemap);
    });

    await api.service.run("build:sitemap", args);
  });
};

module.exports.defaultModes = {
  "build:prerender": "production",
};
