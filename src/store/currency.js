import axios from "../axiosBooking";
import {} from "./data/types";
import {
  GET_CURRENCY,
  SET_CURRENCY
} from "./data/types";

const currency = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).currency_id;

const state = {
  selectedCurrency: currency,
};

const mutations = {
  async [SET_CURRENCY](state, payload) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        currency_id: payload
      })
    );
    if (localStorage.getItem("loggedIn")) {
      const res = await axios.post(`user/setting`, {
        user_id: userData.id,
        currency_id: payload,
      });
    }
    state.selectedCurrency = payload.toLowerCase();
  },
};

const getters = {
  [GET_CURRENCY]: (state) => state.selectedCurrency,
};

export default {
  state,
  mutations,
  getters,
};