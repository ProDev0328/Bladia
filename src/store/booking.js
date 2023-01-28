import axios from "../axiosBooking";
import {
  GET_USER_BOOKINGS,
  SET_USER_BOOKINGS,
  FETCH_USER_BOOKINGS,
  GET_LOAD_BOOKINGS_STATUS
} from "./data/types";

const state = {
  bookings: [],
  loadingStatus: false
};

const mutations = {
  async [SET_USER_BOOKINGS](state, payload) {
    state.bookings = payload.filter((v) => v.price);
  },
  async ['setLoadingStatus'](state, payload) {
    state.loadingStatus = payload;
  },
};

const actions = {
  async [FETCH_USER_BOOKINGS](context) {
    context.commit('setLoadingStatus', true);
    const res = await axios.get(`booking/user/5cd3b316fd89786c2206ed64`);
    context.commit(SET_USER_BOOKINGS, res.data.data.items);
    context.commit('setLoadingStatus', false);
  },
};

const getters = {
  [GET_USER_BOOKINGS]: (state) => state.bookings,
  [GET_LOAD_BOOKINGS_STATUS]: (state) => state.loadingStatus,
};

export default {
  state,
  actions,
  mutations,
  getters,
};