import { useRoute } from "vue-router";
import { COOKIE_EXPIRATION_TIME } from "../store/data/types";
import { useI18n } from "./i18nPlugin";
import { version } from "../../package";
import { LANGS, DEFAULT_LANGUAGE } from "../store/data/types";

export function updateCookieExpiration() {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn) {
    const expiration = parseInt(localStorage.getItem("expiration"));
    if (expiration > new Date().getTime()) {
      localStorage.setItem(
        "expiration",
        new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000
      );
    } else {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userData");
    }
  }

  const expireBanner = parseInt(localStorage.getItem("expireBanner"));

  if (expireBanner < new Date().getTime()) {
    localStorage.removeItem("expireBanner");
  }
}
export function getAppName() {
  let host = window.location.host;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (host === "localhost:8080") {
    if (params.domain == "bladia.com") {
      return "Bladia";
    } else if (params.domain == "viaferries.com") {
      return "Viaferries";
    }
  }
  return process.env.VUE_APP_NAME;
}

export function isLocal() {
  let host = window.location.host;
  return host === "localhost:8080" || host === "127.0.0.1:8080";
}

export function getAppDomain() {
  let host = window.location.host;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (isLocal()) {
    if (params.domain) {
      host = params.domain;
    } else {
      host = `${process.env.VUE_APP_DOMAIN}`;
    }
  }
  return host;
}

export function isViaferries() {
  const host = getAppDomain();
  return host.search("viaferries") != -1;
}

export function isBladia() {
  const host = getAppDomain();
  return host.search("bladia") != -1;
}

export function strtr(s, p, r) {
  return (
    !!s &&
    {
      2: function () {
        for (var i in p) {
          s = strtr(s, i, p[i]);
        }
        return s;
      },
      3: function () {
        return s.replace(RegExp(p, "g"), r);
      },
      0: function () {
        return;
      },
    }[arguments.length]()
  );
}

export function updateSavedItemsOnUpdate() {
  if (!localStorage.getItem("version")) {
    localStorage.setItem("version", version);
    return;
  }
  if (localStorage.getItem("version") != version) {
    localStorage.removeItem("config");
    localStorage.removeItem("expireConfig");
    localStorage.removeItem("journey");
    localStorage.removeItem("vehicles");
    localStorage.removeItem("banner");
    localStorage.setItem("version", version);
  }
}

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let i18n;
let route;
export function commonMetaTags(title, description) {
  if (!i18n) {
    i18n = useI18n();
  }
  if (!route) {
    route = useRoute();
  }
  const lang = JSON.parse(localStorage.getItem("userData")).language_id;
  return [
    {
      property: "og:title",
      content: title,
    },
    { property: "og:site_name", content: getAppName() },
    // The list of types is available here: http://ogp.me/#types
    { property: "og:type", content: "website" },
    // Should the the same as your canonical link, see below.
    {
      property: "og:url",
      content: process.env.VUE_APP_FULL_DOMAIN + route.fullPath,
      //content: "https://www.my-site.com/my-special-page",
    },
    {
      property: "og:image",
      content: i18n.$t("SEO")["social"]["facebook"]["image_url"],
    },
    // Often the same as your meta description, but not always.
    {
      property: "og:description",
      content: description,
    },

    // Twitter card
    {
      name: "twitter:card",
      content: i18n.$t("SEO")["social"]["twitter"]["summary"],
    },
    {
      name: "twitter:site",
      content: process.env.VUE_APP_FULL_DOMAIN + route.fullPath,
    },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    // Your twitter handle, if you have one.
    {
      name: "twitter:creator",
      content: i18n.$t("SEO")["social"]["twitter"]["creator"],
    },
    {
      name: "twitter:image:src",
      content: i18n.$t("SEO")["social"]["twitter"]["image_url"],
    },

    // Google / Schema.org markup:
    { itemprop: "name", content: title },
    { itemprop: "description", content: description },
    {
      itemprop: "image",
      content: i18n.$t("SEO")["social"]["google"]["image_url"],
    },
  ];
}

export function baseLinks(route, defaultRoute) {
  const currentLang = JSON.parse(localStorage.getItem("userData")).language_id;
  const links = [];
  if (typeof defaultRoute === "undefined") {
    defaultRoute = route;
  }
  for (const lang of LANGS) {
    const localRoute = typeof route === "object" ? route[lang.key] : route;
    const item = {
      vmid: lang.key + "-" + localRoute.split("/").join("-"),
      rel: lang.key === currentLang ? "canonical" : "alternate",
      href: process.env.VUE_APP_FULL_DOMAIN + "/" + lang.key + "/" + localRoute,
    };
    if (lang.key !== currentLang) {
      item.hreflang = lang.key;
    }

    links.push(item);
  }
  links.push({
    vmid: "default",
    rel: "alternate",
    href:
      process.env.VUE_APP_FULL_DOMAIN +
      "/" +
      DEFAULT_LANGUAGE +
      "/" +
      defaultRoute,
    hreflang: "x-default",
  });
  return links;
}
