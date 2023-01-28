import axios from "../axiosBooking";
import {
  getAppDomain
} from "../plugins/utility";
import {
  COOKIE_EXPIRATION_TIME,
  GET_LOGGED_IN,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER,
  INIT_CONFIG,
  INIT_BANNER,
  INIT_JOURNEY,
  SET_BANNER,
  SET_CONFIG,
  SET_LOGGED_IN,
  SET_USERINFO,
  GET_USERINFO,
  SET_CURRENCY,
  SET_LANGUAGE,
  SOCIAL_LOG_IN,
  GET_CONFIG,
} from "../store/data/types";

const initialLoggedIn = localStorage.getItem("loggedIn");
const initialUserInfo = JSON.parse(localStorage.getItem("userData"));

const state = {
  config: [],
  loggedIn: initialLoggedIn ? initialLoggedIn : null,
  userData: initialUserInfo ? initialUserInfo : null,
};

const actions = {
  async [INIT_CONFIG](context) {
    const host = getAppDomain();

    const vuexStorage = JSON.parse(localStorage.getItem("config"));

    if (vuexStorage && vuexStorage.length !== 0) {

      context.commit(SET_CONFIG, vuexStorage);
      // const res = await axios.get(`utils/config/${host}`);
      // localStorage.setItem("config", JSON.stringify(res.data.data.items[0]));
      // localStorage.setItem('expireConfig', new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000);
      // context.commit(SET_CONFIG, res.data.data.items);

      // to filter journeys by zone
      context.dispatch(INIT_JOURNEY);
      return Promise.resolve(vuexStorage);

    } else {
      try {
        //  if (localhost) => ${ process.env.VUE_APP_DOMAIN }
        const res = await axios.get(`utils/config/${host}`);
        localStorage.setItem("config", JSON.stringify(res.data.data.items[0]));
        localStorage.setItem('expireConfig', new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000);
        context.commit(SET_CONFIG, res.data.data.items[0]);

        // to filter journeys by zone
        context.dispatch(INIT_JOURNEY);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject();
      }
    }
  },

  async [INIT_BANNER](context) {
    const vuexStorage = JSON.parse(localStorage.getItem("banner"));
    const persistStorage = vuexStorage;

    if (vuexStorage && vuexStorage.length !== 0) {
      context.commit(SET_BANNER, persistStorage);
      return Promise.resolve();
    } else {
      try {
        const res = await axios.get(
          `banner/list/${process.env.VUE_APP_DOMAIN}`
        );
        localStorage.setItem("banner", JSON.stringify(res.data.data.items));
        localStorage.setItem('expireBanner', new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000);
        context.commit(SET_BANNER, res.data.data.items);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject();
      }
    }
  },

  async [LOG_IN](context, {
    username,
    password
  }) {
    try {
      const res = await axios.post(`user/login`, {
        username,
        password
      });
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userData", JSON.stringify(res.data.data.items[0]));
      localStorage.setItem(
        "expiration",
        new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000
      );
      const userInfo = res.data.data.items[0];
      context.commit(SET_USERINFO, userInfo);
      context.commit(SET_LOGGED_IN, true);
      context.commit(SET_CURRENCY, userInfo.currency_id.toLowerCase());
      context.commit(SET_LANGUAGE, userInfo.language_id);
    } catch {
      console.log('error in login');
    }
  },

  async [UPDATE_USER](context, payload) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.id;
    const res = await axios.put(`user/${userId}`, payload);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        loggedIn: true,
        user: res.data.data,
      })
    );
  },
  async [SOCIAL_LOG_IN](context, payload) {
    try {
      const res = await axios.post(`user/social`, payload);

      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userData", JSON.stringify(res.data.data.items[0]));
      localStorage.setItem(
        "expiration",
        new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000
      );
      const userInfo = res.data.data.items[0];
      context.commit(SET_USERINFO, userInfo);
      context.commit(SET_LOGGED_IN, true);
      context.commit(SET_CURRENCY, userInfo.currency_id.toLowerCase());
      context.commit(SET_LANGUAGE, userInfo.language_id);
    } catch {
      console.log('error in login social');
    }
  },

  [LOG_OUT](context) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userData");
    context.commit(SET_LOGGED_IN);
  },
};

const mutations = {
  [SET_BANNER](state, payload) {
    state.banner = [];
    for (const item of payload) {
      const bannerItem = "";
      state.banner.push(bannerItem);
    }
  },

  [SET_USERINFO](state, payload) {
    state.userData = payload;
  },

  [SET_CONFIG](state, payload) {
    state.config = payload;
  },

  [SET_BANNER](state) {
    const banner = localStorage.getItem("banner");
    state.banner = banner ? banner : null;
  },

  [SET_LOGGED_IN](state) {
    const initLoggedIn = localStorage.getItem("loggedIn");
    state.loggedIn = initLoggedIn ? initLoggedIn : null;
  },
};

const getters = {
  [GET_LOGGED_IN]: (state) => state.loggedIn,
  [GET_USERINFO]: (state) => state.userData,
  [GET_CONFIG]: (state) => state.config
};

export default {
  state,
  actions,
  mutations,
  getters,
};