import { createRouter, createWebHistory } from "vue-router";
import { updateCookieExpiration } from "../plugins/utility";
import store from "../store";
import { ref } from "vue";
import { DEFAULT_LANGUAGE, LANGS, SET_LANGUAGE } from "../store/data/types";

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  },
  history: createWebHistory(process.env.VUE_APP_BASE_ROUTE),
  routes: [
    {
      path: "/:lang",
      component: () => import('../layout/RouterView.vue'),
      children: [
        {
          path: "ferry",
          alias: ["", "/"],
          name: "ferry",
          component: () => import('../views/Ferry/Search.vue')
        },
        {
          path: "help",
          name: "help",
          component: () => import('../views/Content/Help.vue')
        },
        {
          path: "condition",
          name: "condition",
          component: () => import('../views/Content/Condition.vue')
        },
        {
          path: "faq",
          name: "faq",
          component: () => import('../views/Content/Faq.vue')
        },
        {
          path: "transporter",
          name: "transporter",
          alias: ["transporteur", "transporter"],
          component: () => import('../views/Transporter/Index.vue')
        },
        {
          path: "transporteur/:name",
          name: "transporterDetails",
          alias: ["transporteur/:name", "transporter/:name"],
          component: () => import('../views/Transporter/TransporterDetails.vue')
        },
        {
          path: 'blog',
          component: () => import('../views/Blog/Index.vue')
        },
        {
          path: "blog/:name",
          name: "blogDetails",
          alias: ["blog/:name", "news/:name"],
          component: () => import('../views/Blog/BlogDetails.vue')
        },
        {
          path: "faq/:name/:id",
          name: "faqDetails",
          component: () => import('../views/Content/FaqDetails.vue')
        },
        {
          path: "journey",
          name: "journey",
          component: () => import('../views/Ferry/Journey.vue')
        },
        {
          path: "vehicle/brand",
          name: "vehicle-brand",
          component: () => import('../views/Ferry/Vehicle/Brand.vue')
        },
        {
          path: "vehicle/model",
          name: "vehicle-model",
          component: () => import('../views/Ferry/Vehicle/Model.vue')
        },
        {
          path: "vehicle/luggage",
          name: "vehicle-luggage",
          component: () => import('../views/Ferry/Vehicle/Luggage.vue')
        },
        {
          path: "vehicle",
          name: "vehicle",
          component: () => import('../layout/RouterView.vue')
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import('../views/Calendar.vue')
        },
        {
          path: "passenger",
          name: "passenger",
          component: () => import('../views/Passenger.vue')
        },
        {
          path: "animals",
          name: "animals",
          component: () => import('../views/Animals.vue')
        },
        {
          path: "passengerdetail",
          name: "passengerdetail",
          component: () => import('../views/Results/PassenderDetail/PassengerDetail.vue')
        },
        {
          path: "passengerdetail/edit",
          name: "passengerdetail-edit",
          component: () => import('../views/Results/PassenderDetail/PassengerDetailForm.vue')
        },
        {
          path: "result",
          component: () => import('../views/Results/Result.vue'),
          children: [
            {
              alias: "",
              path: "cost",
              name: "result-cost",
              component: () => import('../views/Results/Cost.vue')
            },
            {
              alias: "",
              path: "cost/return",
              name: "result-cost-return",
              component: () => import('../views/Results/CostReturn.vue')
            },
            {
              path: "installation",
              name: "result-installation",
              component: () => import('../views/Results/Installation.vue')
            },
            {
              path: "confirm",
              name: "result-confirm",
              component: () => import('../views/Results/ConfirmResult.vue')
            },
            {
              path: "resume",
              name: "result-resume",
              component: () => import('../views/Results/Resume.vue')
            },
          ],
        },
        {
          path: "payment",
          component: () => import('../views/Payment.vue')
        },
        {
          path: "ports",
          name: "ports",
          alias: ["puertos", "Häfen", "porti", "poorten"],
          component: () => import('../views/Port/Ports')
        },
        {
          path: "port-ferry-:title/:id",
          name: "portDetails",
          alias: [
            "ferry/puertos/:title/:id",
            "farhen/Häfen/:title/:id",
            "ferries/porti/:title/:id",
            "ferries/poorten/:title/:id",
          ],
          component: () => import('../views/Port/PortDetails')
        },
        {
          path: "ferry/companies",
          name: "companies",
          alias: ["ferry/compagnies"],
          component: () => import('../views/Company/Companies')
        },
        {
          path: "journeys",
          name: "journeys",
          alias: ["traversees", "routes", "rutas", "strecken"],
          component: () => import('../views/Journey/Journeys')
        },
        {
          path: "ferry/:company/:name/:id",
          alias: ["farhen/:company/:name/:id", "ferries/:company/:name/:id"],
          name: "journeyDetails",
          component: () => import('../views/Journey/JourneyDetails')
        },
        {
          path: "hours/:title/:id",
          name: "journeyHours",
          alias: [
            "schedules/:title/:id",
            "horaires/:title/:id",
            "horas/:title/:id",
            "uren/:title/:id",
            "std/:title/:id",
            "ore/:title/:id",
          ],
          component: () => import('../views/Journey/JourneyHours')
        },
        {
          path: "offers",
          name: "offers",
          component: () => import('../views/Content/Offers.vue')
        },
        {
          path: "mybooking",
          component: () => import('../views/Profile/Mybooking.vue'),
          children: [
            {
              path: "retrievebooking",
              name: "mybooking-retrievebooking",
              component: () => import('../views/Profile/Retrievebooking.vue')
            },
          ],
        },
        {
          path: "profile",
          name: "profile",
          component: () => import('../views/Profile/Profile.vue')
        },
        {
          path: "connect",
          name: "profile-connect",
          component: () => import('../views/Auth/Connect.vue')
        },
        {
          path: "register",
          name: "profile-register",
          component: () => import('../views/Auth/Register.vue')
        },
        {
          path: "lost-password",
          name: "lost-password",
          component: () => import('../views/Auth/LostPassword.vue')
        },
        {
          path: "change-password",
          name: "change-password",
          component: () => import('../views/Auth/ChangePassword.vue')
        },
        {
          path: "about",
          name: "about",
          component: () => import('../views/Content/About.vue')
        },
        {
          path: "mycompany",
          name: "mycompany",
          component: () => import('../views/Profile/MyCompany.vue')
        },
        {
          path: "settings",
          name: "settings",
          component: () => import('../views/Profile/Settings.vue')
        },
        {
          path: ":catchAll(.*)",
          name: "not_found_lang",
          component: () => import('../views/Content/PageNotFound.vue')
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "not_found",
      component: () => import('../views/Content/PageNotFound.vue')
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log("from-->",from)
  console.log("to---->",to)
  const langs = ref(LANGS).value.map(function (row) {
    return row.key;
  });

  const lang = to.params.lang;
  const config = JSON.parse(localStorage.getItem("config"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userLang =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData")).language_id;
  let defaultLang = userLang
    ? userLang
    : config != null
      ? config.language
      : null;
  if (defaultLang == null) {
    defaultLang = navigator.language.split("-")[0];
    if (!["en", "fr", "de", "nl", "es", "it"].includes(defaultLang)) {
      defaultLang = DEFAULT_LANGUAGE;
    }
  }
  if (!langs.includes(lang)) {
    if (to.fullPath != "/") next("/" + defaultLang + to.fullPath);
    next("/" + defaultLang);
    return;
  }

  let language = to.params.lang;
  if (!language) {
    language = defaultLang;
  }
  store.commit(SET_LANGUAGE, language);
  localStorage.setItem(
    "userData",
    JSON.stringify({
      ...userData,
      language_id: language,
    })
  );

  if (to.name == "not_found" || to.name == "not_found_lang") {

    let path = to.path.trim();
    while (path.charAt(0) == "/") {
      path = path.substring(1);
    }
    while (path.charAt(path.length - 1) == "/") {
      path = path.substring(0, path.length - 1);
    }
    if (langs.includes(path) || path === "") {
      next("ferry");
      return
    }
    next();
    return;
  }

  updateCookieExpiration();
  const forbiddenPages = ["/profile", "/profile/myprofile"];
  const authRequired = forbiddenPages.includes(to.path);
  const loggedIn = localStorage.getItem("loggedIn");
  if (authRequired && !loggedIn) {
    next("/profile/connect");
    return
  } else {
    /* remove last '/' on url  : todo */
    to.fullPath = to.fullPath.replace(/\/\/*/g, "/").replace(/\/+$/, "");
    next();
    return
  }
});

export default router;