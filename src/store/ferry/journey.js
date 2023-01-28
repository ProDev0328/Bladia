import axios from "../../axiosApiferry";
import {
    INIT_JOURNEY,
    SET_JOURNEY,
    GET_JOURNEY,
    SEARCH_JOURNEY,
    CHANGE_SCREEN,
    GET_SCREEN,
    GET_SELECTEDITEM,
    GET_RELATEDITEMS,
    STORAGE_JOURNEY,
    GET_BASE_JOURNEYS,
    GET_JOURNEY_GROUPS,
} from "./../data/types";

import Journey from "../../models/journey";

const state = {
    totalJourney: [],
    journies: [],
    journeyGroups: {},
    baseJourneys: [],
    screen1: true,
    selectedItem: {},
    relatedItems: [],
};

const actions = {
    async [INIT_JOURNEY](context) {
        const vuexStorage = JSON.parse(localStorage.getItem(STORAGE_JOURNEY));
        const config = JSON.parse(localStorage.getItem('config'));
        if (vuexStorage && vuexStorage.length !== 0) {
            let filteredByZone = [];
            if (config != null) {
                for (const item of vuexStorage) {
                    if (config.zone.includes(item.zone))
                        filteredByZone.push(item);
                }
            } else {
                filteredByZone = vuexStorage;
            }
            context.commit("setTotal", filteredByZone);
            context.commit(SET_JOURNEY, filteredByZone);
            return Promise.resolve();
        } else {
            try {
                const res = await axios.get("/journey");
                let filteredByZone = [];
                if (config != null) {
                    for (const item of res.data.data) {
                        if (config.zone.includes(item.zone)) {
                            filteredByZone.push(item);
                        }
                    }
                } else {
                    filteredByZone = res.data.data;
                }
                context.commit("setTotal", filteredByZone);
                context.commit(SET_JOURNEY, filteredByZone);
                return Promise.resolve(res);
            } catch (err) {
                return Promise.reject();
            }
        }
    },

    [SEARCH_JOURNEY](context, searchKey) {
        const filterd = [];
        const started = [];
        context.state.totalJourney.map((jrn) =>{
            if(jrn.name.toLowerCase().includes(searchKey.toLowerCase())){
                if(jrn.name.toLowerCase().indexOf(searchKey.toLowerCase()) == 0){
                    started.push(jrn);
                }else{
                    filterd.push(jrn);
                }
            }
        }
        );
        context.commit(SET_JOURNEY, started.concat(filterd));
    },
};

const mutations = {
    [SET_JOURNEY](state, payload) {
        state.journies = [];
        state.journeyGroups = {};
        let baseJourneys = {};
        for (const item of payload) {
            const journey = new Journey(item);
            state.journies.push(journey);
            if (Object.keys(baseJourneys).includes(journey.name.toLowerCase())) {
                if (!Object.keys(state.journeyGroups).includes(journey.name.toLowerCase())) {
                    state.journeyGroups[journey.name.toLowerCase()] = [
                        baseJourneys[journey.name.toLowerCase()],
                    ];
                }
                state.journeyGroups[journey.name.toLowerCase()].push(journey);
            } else {
                baseJourneys[journey.name.toLowerCase()] = journey;
            }
        }
        state.baseJourneys =  Object.values(baseJourneys);
    },
    [CHANGE_SCREEN](state, {
        screen,
        item
    }) {
        state.screen1 = screen;
        state.selectedItem = item;
    },
    setTotal(state, payload) {
        state.totalJourney = [];
        for (const item of payload) {
            const journeyItem = new Journey(item);
            state.totalJourney.push(journeyItem);
        }
        localStorage.setItem(STORAGE_JOURNEY, JSON.stringify(state.totalJourney));
    },
};

const getters = {
    [GET_JOURNEY]: (state) => state.journies,
    [GET_BASE_JOURNEYS]: (state) => state.baseJourneys,
    [GET_JOURNEY_GROUPS]: (state) => state.journeyGroups,
    [GET_SCREEN]: (state) => state.screen1,
    [GET_SELECTEDITEM]: (state) => state.selectedItem,
    [GET_RELATEDITEMS]: (state) => state.relatedItems,
};

export default {
    state,
    actions,
    mutations,
    getters,
};