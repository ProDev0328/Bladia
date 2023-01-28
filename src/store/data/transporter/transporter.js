import axios from "../../../axiosBooking";
import {
    INIT_TRANSPORTER,
    GET_TRANSPORTER,
    STORAGE_TRANSPORTER,
    SEARCH_TRANSPORTER,
    SET_TRANSPORTER,
    TRANSPORTER_CHANGE_SCREEN,
    GET_TRANSPORTER_SELECTEDITEM,
    GET_TRANSPORTER_RELATEDITEMS,
    GET_TRANSPORTER__SCREEN,
    COOKIE_EXPIRATION_TIME,
} from "./../../data/types";

import Transporter from "../../../models/transporter";

const state = {
    totalTransporter: [],
    transporterlist: [],
    transportGroups: {},
    baseTransporters: [],
    transporterScreen1: true,
    transporterSelectedItem: {},
    transporterRelatedItems: [],
};

const actions = {    
    async [INIT_TRANSPORTER](context) {
        const vuexStorage = JSON.parse(localStorage.getItem(STORAGE_TRANSPORTER));
        const persistStorage = vuexStorage;
        if (vuexStorage && vuexStorage.length !== 0) {
            context.commit(SET_TRANSPORTER, persistStorage);
        } else {
            try {
                const res = await axios.get("/transporter");
                localStorage.setItem("transporter", JSON.stringify(res.data.data.items));
                localStorage.setItem('expireTransporter', new Date().getTime() + COOKIE_EXPIRATION_TIME * 1000);
                context.commit(SET_TRANSPORTER, res.data.data.items);
            } catch (err) {
                console.log(err);
            }
        }
    },

    [SEARCH_TRANSPORTER](context, searchKey) {
        const filterd = [];
        const started = [];
        context.state.totalTransporter.map((jrn) =>{
            if(jrn.name.toLowerCase().includes(searchKey.toLowerCase())){
                if(jrn.name.toLowerCase().indexOf(searchKey.toLowerCase()) == 0){
                    started.push(jrn);
                }else{
                    filterd.push(jrn);
                }
            }
        }
        );
        context.commit(SET_TRANSPORTER, started.concat(filterd));
    },
};

const mutations = {
    [SET_TRANSPORTER](state, payload) {
        state.transporterlist = [];
        state.transportGroups = {};
        let baseTransporters = {};
        for (const item of payload) {
            const transporter = new Transporter(item);
            state.transporterlist.push(transporter);
            if (Object.keys(baseTransporters).includes(transporter.name.toLowerCase())) {
                if (!Object.keys(state.transportGroups).includes(transporter.name.toLowerCase())) {
                    state.transportGroups[transporter.name.toLowerCase()] = [
                        baseTransporters[transporter.name.toLowerCase()],
                    ];
                }
                state.transportGroups[transporter.name.toLowerCase()].push(transporter);
            } else {
                baseTransporters[transporter.name.toLowerCase()] = transporter;
            }
        }
        state.baseTransporters =  Object.values(baseTransporters);
    },
    [TRANSPORTER_CHANGE_SCREEN](state, {
        screen,
        item
    }) {
        state.transporterScreen1 = screen;
        state.transporterSelectedItem = item;
    },

};

const getters = {
    [GET_TRANSPORTER]: (state) => state.transporterlist,
    [GET_TRANSPORTER__SCREEN]: (state) => state.transporterScreen1,
    [GET_TRANSPORTER_SELECTEDITEM]: (state) => state.transporterSelectedItem,
    [GET_TRANSPORTER_RELATEDITEMS]: (state) => state.transporterRelatedItems,
};

export default {
    state,
    actions,
    mutations,
    getters,
};