import axios from "../axiosBooking";

import {
  GET_LANGUAGE,
  SET_LANGUAGE
} from "./data/types";

let lang = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).language_id;
if (lang == null) {
  lang = navigator.language.split('-')[0];
  if (!['en', 'fr', 'de', 'nl', 'es', 'it'].includes(lang)) {
    lang = 'fr';
  }
}

const state = {
  selectedLang: lang,
};

const mutations = {
  async [SET_LANGUAGE](state, payload) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        language_id: payload
      })
    );
    if (localStorage.getItem("loggedIn")) {
      const res = await axios.post(`user/setting`, {
        user_id: userData.id,
        language_id: payload,
      });
    }
    state.selectedLang = payload;
  },
};

const getters = {
  [GET_LANGUAGE]: (state) => state.selectedLang,
};

export default {
  state,
  mutations,
  getters,
};