import Ferry from "../models/search";
import PaxModel from "../models/passenger";
import PetsModel from "../models/pet";
import axios from "../axiosApiferry";

import {
  DIRECTION_RETURN,
  GET_OUTJOURNEYS,
  GET_RETJOURNEYS,
  GET_OUT_JOURNEY_ID,
  SET_JOURNEY_DIRECTION,
  GET_JOURNEY_DIRECTION,
  FETCH_SELECTED_JOURNEY,
  SET_SELECTED_JOURNEY,
  GET_SELECTED_JOURNEY,
  GET_OUT_VALID_DATES,
  GET_RET_VALID_DATES,
  SET_OUT_AT,
  GET_OUT_AT,
  SET_RET_AT,
  GET_RET_AT,
  SET_OUT_TIME,
  GET_OUT_TIME,
  SET_RET_TIME,
  GET_RET_TIME,
  SET_PASSENGER,
  SET_SELECTED_VEHICLE,
  GET_SELECTED_VEHICLE,
  GET_ADULT_TOTAL,
  GET_CHILDREN_TOTAL,
  GET_SELECTED_PASSENGERS,
  SET_PASSENGER_DETAIL,
  SET_VEHICLE_IDENTIFICATION,
  SET_PETS,
  GET_PETS,
  SET_CONTACT_INFO,
  GET_CONTACT_INFO,
  SET_SERVICES,
  GET_SERVICES,
  FETCH_SEARCHED_RESPOSNE,
  REMOVE_SEARCHED_RESPONSE,
  SET_SEARCHED_RESPONSE,
  GET_SEARCHED_RESPONSE,
  GET_SEARCHED_RESULT,
  SET_SEARCHED_STATUS,
  GET_SEARCHED_STATUS,
  SET_SEARCHED_STATUSES,
  GET_SEARCHED_STATUSES,
  SET_SEARCHED_ERRORS,
  GET_SEARCHED_ERRORS,
} from "./data/types";

export const state = {
  searched: new Ferry({}),
  direction: DIRECTION_RETURN,
  out_journey_id: null,
  ret_journey_id: null,
  selectedJourney: [],
  outValidDates: [],
  retValidDates: [],
  out_at: "",
  ret_at: "",
  passenger: [new PaxModel({}).toJson()],
  passengers: [new PaxModel({}).toJson()],
  pets: new PetsModel().toJson(),
  adultTotal: 1,
  childrenTotal: 0,
  vehicle: [],
  services: {},
  contactInfo: {},
  searched_response: [],
  search_errors: [],
  statuses: {},
  status: "",
};

const actions = {
  async [FETCH_SELECTED_JOURNEY](context, payload) {
    const res = await axios.get(
      `/journey/${payload.selectedID}?direction=${payload.direction}`
    );

    context.commit(SET_SELECTED_JOURNEY, res.data.data);
  },

  async [FETCH_SEARCHED_RESPOSNE](context) {
    console.log("context--->",context)
    let requests = [];
    const is_return =
      context.getters[GET_JOURNEY_DIRECTION] === DIRECTION_RETURN;
    for (const k in context.state.searched.request) {
      if (context.state.searched.request[k]["out_time"]) {
        if (!is_return || !context.state.searched.request[k]["ret_time"]) {
          context.state.searched.request[k]["ret_at"] = null;
        }
        requests.push(context.state.searched.request[k]);
      }
    }
    context.state.searched.request = requests;
    context.commit(REMOVE_SEARCHED_RESPONSE);
    let statuses = {};
    for (const request of context.state.searched.request) {
      statuses[request.company] = {
        status: "waiting",
        company: request.company,
      };
      let responseCount = 0;
      let curDataJson = JSON.parse(JSON.stringify(context.state.searched));
      curDataJson.request = [JSON.parse(JSON.stringify(request))];
      try {
        axios
          .post(`/availability`, curDataJson)
          .then((res) => {
            statuses[request.company].status = "done";
            context.commit(SET_SEARCHED_STATUSES, statuses);
            responseCount++;
            if (responseCount < statuses.length) {
              context.commit(SET_SEARCHED_STATUS, "partial");
            } else {
              context.commit(SET_SEARCHED_STATUS, "done");
            }
            context.commit(SET_SEARCHED_RESPONSE, res.data.data);
            console.log("---response--->",res.data.data)
            if (res.data.errors) {
              for (const error of res.data.errors) {
                context.commit(SET_SEARCHED_ERRORS, error.message);
              }
            }
          })
          .catch(function (error) {
            statuses[request.company].status = "failed";
            context.commit(SET_SEARCHED_STATUSES, statuses);

            responseCount++;
            if (responseCount < statuses.length) {
              context.commit(SET_SEARCHED_STATUS, "partial");
            } else {
              context.commit(SET_SEARCHED_STATUS, "done");
            }
            context.commit(SET_SEARCHED_ERRORS, error.message);
            if (error.response) {
              // Request made and server responded
              console.log(error.response);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message, error);
            }
          });
      } catch (err) {
        console.log(err);
        //context.commit(SET_SEARCHED_STATUS, err.response);
      }
    }
    context.commit(SET_SEARCHED_STATUSES, statuses);
    context.commit(SET_SEARCHED_STATUS, "waiting");
  },
};

export const mutations = {
  [SET_JOURNEY_DIRECTION](state, payload) {
    state.direction = payload;
  },

  [SET_SELECTED_JOURNEY](state, payload) {
    state.selectedJourney = payload;
    let outJourneys = [];
    let retJourneys = [];

    payload.map((item) => {
      item.direction === "Outward"
        ? outJourneys.push(item)
        : retJourneys.push(item);
    });

    state.outJourneys = outJourneys.length > 0 ? outJourneys : null;
    state.retJourneys = retJourneys.length > 0 ? retJourneys : null;

    state.outValidDates = [];
    state.retValidDates = [];

    state.searched.direction = state.direction;
    let requests = [];
    for (const outJourney of outJourneys) {
      for (const outDate of outJourney.departure) {
        state.outValidDates.push({
          date: outDate.depart,
          company: outJourney.company,
        });
        state.outValidDates.sort();
      }
      requests.push({
        journey_id: outJourney.id,
        arrive_code: outJourney.arrive_code,
        depart_code: outJourney.depart_code,
        company: outJourney.company,
        out_is_open: false,
        ret_is_open: false,
      });
    }
    if (state.retJourneys) {
      for (const retJourney of retJourneys) {
        for (const retDate of retJourney.departure) {
          state.retValidDates.push({
            date: retDate.depart,
            company: retJourney.company,
          });
        }
      }
    }

    state.searched.request = requests;
  },

  [SET_OUT_AT](state, { dates, selectedDate }) {
    if (!dates || dates.length == 0) {
      state.out_at = null;
      return;
    }
    for (const k in state.searched.request) {
      if (dates[state.searched.request[k].company]) {
        state.searched.request[k].out_at =
          dates[state.searched.request[k].company];
      }
    }
    state.out_at = selectedDate;
  },

  [SET_RET_AT](state, { dates, selectedDate }) {
    if (!dates || dates.length == 0) {
      state.ret_at = null;
      return;
    }
    for (const k in state.searched.request) {
      if (dates[state.searched.request[k].company]) {
        state.searched.request[k].ret_at =
          dates[state.searched.request[k].company];
      }
    }
    state.ret_at = selectedDate;
  },

  [SET_PASSENGER](state, payload) {
    state.passengers = [payload.paxs[0]];
    state.searched.passengers = state.passengers;
    for (let i = 0; i < payload.paxs.length; i++) {
      if (payload.paxs[i] != undefined) {
        if (state.searched.passengers[0].order !== payload.paxs[i].order) {
          state.passengers.push(payload.paxs[i]);
          state.searched.passengers = state.passengers;
        }
      }
    }

    state.adultTotal = payload.adultTotal;
    state.childrenTotal = payload.childrenTotal + payload.babyTotal;
  },

  [SET_PETS](state, payload) {
    state.pets = {
      ...payload,
    };
    state.searched.pets = state.pets;
  },

  [SET_OUT_TIME](state, payload) {
    for (const k in state.searched.request) {
      if (payload[state.searched.request[k].company]) {
        state.searched.request[k].out_time =
          payload[state.searched.request[k].company];
      }
    }
    state.out_time = payload;
  },

  [SET_RET_TIME](state, payload) {
    for (const k in state.searched.request) {
      if (payload[state.searched.request[k].company]) {
        state.searched.request[k].ret_time =
          payload[state.searched.request[k].company];
      }
      // state.searched.request[k].ret_time = payload;
    }
    state.ret_time = payload;
  },

  [SET_SELECTED_VEHICLE](state, payload) {
    if (payload !== null) {
      state.vehicle = [
        {
          ...payload,
        },
      ];
      state.searched.vehicles = state.vehicle;
      state.searched.vehicles.code = payload.code;
    } else {
      state.vehicle = [];
      state.searched.vehicles = [];
    }
  },

  [SET_VEHICLE_IDENTIFICATION](state, payload) {
    const currentVeh = state.searched.vehicles;

    currentVeh[0] = {
      ...currentVeh[0],
      identification: payload,
    };

    state.vehicle = currentVeh;
    state.searched.vehicles = currentVeh;
  },

  [SET_PASSENGER_DETAIL](state, payload) {
    state.searched.passengers[payload.order - 1].first_name =
      payload.first_name;
    state.searched.passengers[payload.order - 1].last_name = payload.last_name;
    state.searched.passengers[payload.order - 1].nationality =
      payload.nationality;
    state.searched.passengers[payload.order - 1].doc_number =
      payload.doc_number;
    state.passengers[payload.order - 1].first_name = payload.first_name;
    state.passengers[payload.order - 1].last_name = payload.last_name;
    state.passengers[payload.order - 1].birth_date = payload.birth_date;
    state.passengers[payload.order - 1].nationality = payload.nationality;
    state.passengers[payload.order - 1].doc_number = payload.doc_number;
  },

  [SET_SERVICES](state, payload) {
    state.services = {
      ...payload,
    };
    state.searched.services = {
      ...payload,
    };
  },

  [SET_CONTACT_INFO](state, payload) {
    state.contactInfo = {
      ...payload,
    };
    state.searched.contact = {
      ...payload,
    };
  },

  [SET_SEARCHED_RESPONSE](state, payload) {
    if (!payload) {
      state.searched_response = null;
      state.searched.response = null;
    }
    if (state.searched_response && state.searched.response) {
      state.searched_response = state.searched_response.concat([...payload]);
    } else {
      state.searched_response = [...payload];
    }
    state.searched_response.sort((first, second) => {
      if (first.tariffs.price > second.tariffs.price) return 1;
      else if (first.tariffs.price < second.tariffs.price) return -1;
      return 0;
    });
    state.searched.response = state.searched_response;
  },
  [SET_SEARCHED_ERRORS](state, payload) {
    if (!payload) {
      state.search_errors = null;
      return;
    }
    if (state.search_errors) {
      state.search_errors = state.search_errors.concat([payload]);
    } else {
      state.search_errors = [payload];
    }
  },
  [SET_SEARCHED_STATUSES](state, payload) {
    state.statuses = payload;
  },
  [SET_SEARCHED_STATUS](state, payload) {
    state.status = payload;
  },
  [REMOVE_SEARCHED_RESPONSE](state) {
    delete state.searched.response;
    delete state.searched_response;
  },
};

const getters = {
  [GET_JOURNEY_DIRECTION]: (state) => state.direction,
  [GET_OUT_JOURNEY_ID]: (state) => state.out_journey_id,
  [GET_SELECTED_JOURNEY]: (state) => state.selectedJourney,
  [GET_OUT_VALID_DATES]: (state) => state.outValidDates,
  [GET_RET_VALID_DATES]: (state) => state.retValidDates,
  [GET_OUT_AT]: (state) => state.out_at,
  [GET_RET_AT]: (state) => state.ret_at,
  [GET_ADULT_TOTAL]: (state) => state.adultTotal,
  [GET_CHILDREN_TOTAL]: (state) => state.childrenTotal,
  [GET_SELECTED_PASSENGERS]: (state) => state.passengers,
  [GET_SELECTED_VEHICLE]: (state) => state.searched.vehicles,
  [GET_PETS]: (state) => state.pets,
  [GET_CONTACT_INFO]: (state) => state.contactInfo,
  [GET_SERVICES]: (state) => state.services,
  [GET_SEARCHED_RESPONSE]: (state) => state.searched_response,
  [GET_SEARCHED_ERRORS]: (state) => state.search_errors,
  [GET_SEARCHED_RESULT]: (state) => state.searched,
  [GET_SEARCHED_STATUS]: (state) => state.status,
  [GET_SEARCHED_STATUSES]: (state) => state.statuses,
  [GET_OUT_TIME]: (state) => state.out_time,
  [GET_RET_TIME]: (state) => state.ret_time,
  [GET_OUTJOURNEYS]: (state) => state.outJourneys,
  [GET_RETJOURNEYS]: (state) => state.retJourneys,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
