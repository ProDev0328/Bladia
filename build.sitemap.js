const { default: axios } = require("axios");

const SitemapPlugin = require("sitemap-webpack-plugin").default;
let { paths, LANGS } = require("./src/router/seo_routes");

module.exports = (api, options) => {
  api.registerCommand("build:sitemap", async (args) => {
    const baseURL = process.env.VUE_APP_FULL_DOMAIN;
    const allPaths = {};
    for (const baseLang of LANGS) {
      allPaths[baseLang.key] = [];
      paths.forEach((v) => {
        const mainPath = v.path;
        const newPath = "/" + baseLang.key + mainPath;
        const links = [];
        LANGS.forEach((lang2) => {
          links.push({
            lang: lang2.key,
            url: baseURL + "/" + lang2.key + mainPath,
          });
        });
        allPaths[baseLang.key].push({
          ...v,
          path: newPath,
          links: links,
        });
      });

      if (process.env.VUE_APP_DOMAIN == "bladia.com") {
        let translations = {};
        for (lang of LANGS) {
          translations[
            lang.key
          ] = require(`./src/lang/translations/${lang.key}.json`);
        }
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
          language: baseLang.key,
        };
        const beinBaseUrl = process.env.VUE_APP_BOOKING_URL;
        const instanceBein = axios.create({
          baseURL: beinBaseUrl,
          headers: customBeinHeaders,
        });

        const res = await instance.get("/journey?lang=" + baseLang.key);

        for (const item of res.data.data) {
          // journey detail links
          let links = [];
          let mainPath = `/${translations[baseLang.key].ferry}/${
            item.company
          }/${item.name
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
                `/${translations[lang2.key].ferry}/${item.company}/${item.name
                  .toLowerCase()
                  .split(" - ")
                  .join("-")
                  .split(" ")
                  .join("-")}/${item.id}`,
            });
          }
          allPaths[baseLang.key].push({
            path: encodeURI("/" + baseLang.key + mainPath),
            lastmod: new Date().toISOString().slice(0, 10),
            priority: 0.8,
            changefreq: "weekly",
            links: links,
          });

          // journey schedule links
          links = [];
          mainPath = `/${translations[baseLang.key].hours}/${item.name
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
          allPaths[baseLang.key].push({
            path: encodeURI("/" + baseLang.key + mainPath),
            lastmod: new Date().toISOString().slice(0, 10),
            priority: 0.8,
            changefreq: "daily",
            links: links,
          });
        }
        const portRes = await instanceBein.get("/ferry/ports");
        for (const ports of portRes.data.data.items) {
          for (const item of ports) {
            const links = [];
            const mainPath = `/${
              translations[baseLang.key].ports
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
            allPaths[baseLang.key].push({
              path: encodeURI("/" + baseLang.key + mainPath),
              lastmod: new Date().toISOString().slice(0, 10),
              priority: 0.8,
              changefreq: "weekly",
              links: links,
            });
          }
        }
      }

      api.chainWebpack((config) => {
        let sitemap = new SitemapPlugin({
          base: baseURL,
          paths: allPaths[baseLang.key],
          options: {
            filename: `${baseLang.key}/sitemap.${baseLang.key}.xml`,
            lastmod: true,
            changefreq: "hourly",
            priority: 0.8,
          },
        });
        config.plugin(`sitemap-${baseLang.key}`).use(sitemap);
      });
    }
    await api.service.run("build", args);
  });
};

module.exports.defaultModes = {
  "build:sitemap": "production",
};
