import {
    SET_DEPARTURE_AT,
    GET_DEPARTURE_AT,
    SET_RETURN_AT,
    GET_RETURN_AT,
    SET_INSTALLATION,
    SET_INSTALLATION_RETURN,
    GET_INSTALLATION_RETURN,
    GET_INSTALLATION,
    GET_RESULT_TOTAL_COST,
    SET_RESULT_TOTAL_COST,
    GET_BOOKING_RESULT,
    SET_BOOKING_RESULT,
    SET_MEAL,
    GET_MEAL,
    SET_MEAL_QUANTITY,
    GET_MEAL_QUANTITY
} from "./data/types";

const state = {
    departure_at: null,
    return_at: null,
    installation: null,
    totalPrice: 0,
    mealcost: 0,
    installationReturn: null,
    mealQuantityOutward: 0,
    mealQuantityReturn: 0,
    booking: null
};

const mutations = {
    [SET_DEPARTURE_AT](state, payload) {
        state.departure_at = payload;
    },
    [SET_RETURN_AT](state, payload) {
        state.return_at = payload;
    },
    [SET_INSTALLATION](state, payload) {
        state.installation = payload;
    },
    [SET_INSTALLATION_RETURN](state, payload) {
        state.installationReturn = payload;
    },
    [SET_MEAL_QUANTITY](state, payload) {

    },
    [SET_MEAL](state, payload) {
        state.mealcost = payload;
    },
    [SET_RESULT_TOTAL_COST](state, payload) {
        state.totalPrice = payload;
    },
    [SET_BOOKING_RESULT](state, payload) {
        state.booking = payload;
    },
};

const getters = {
    [GET_DEPARTURE_AT]: (state) => state.departure_at,
    [GET_RETURN_AT]: (state) => state.return_at,
    [GET_INSTALLATION]: (state) => state.installation,
    [GET_INSTALLATION_RETURN]: (state) => state.installationReturn,
    [GET_MEAL]: (state) => state.mealcost,
    [GET_RESULT_TOTAL_COST]: (state) => state.totalPrice,
    [GET_BOOKING_RESULT]: (state) => state.booking,
    [GET_MEAL_QUANTITY]: (state) => state.mealQuantityOutward
};

export default {
    state,
    mutations,
    getters,
};