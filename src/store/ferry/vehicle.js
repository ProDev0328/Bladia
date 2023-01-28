import axios from "../../axiosApiferry";
import Vehicle from "../../models/ferry/vehicle";
import VehicleBrand from "../../models/ferry/vehiclebrand";
import {
    STORAGE_VEHICLE,
    INIT_VEHICLE,
    SET_VEHICLE,
    GET_VEHICLE,
    GET_SELECTEDITEM_VEH,
    SEARCH_VEHICLE,
    SET_SELECTED_VEHICLE_TYPE,
    GET_SELECTED_VEHICLE_TYPE,
    SET_SELECTED_VEHICLE_BRAND,
    GET_SELECTED_VEHICLE_BRAND,
    GET_VEHICLE_BRANDS,
    GET_MODELS,
    SET_SELECTED_MODEL,
    SET_SELECTED_BRAND,
    GET_SELECTED_MODEL,
    SET_SELECTED_CODE,
    SET_SELECTED_TYPE,
    GET_SELECTED_CODE,
    SET_SELECTED_LENGTH,
    SET_SELECTED_HEIGHT,
    SET_VEHICLE_BRANDS,
    FETCH_VEHICLE_BRANDS,
    GET_FILTERED_VEHICLE_BRANDS,
} from "../data/types";

const state = {
    totalVehicle: [],
    vehicles: [],
    vehicleBrands: [],
    selectedItemVeh: {},
    selectedVehicleType: "Car",
    selectedBrand: "",
    models: [],
    selectedModel: "",
    selectedCode: "",
};

const actions = {
    async [INIT_VEHICLE](context) {
        const vuexStorage = JSON.parse(localStorage.getItem(STORAGE_VEHICLE));
        if (vuexStorage && vuexStorage.length !== 0) {
            context.commit("setTotalVeh", vuexStorage);
            context.commit(SET_VEHICLE, vuexStorage);
            return Promise.resolve();
        } else {
            try {
                const res = await axios.get("/vehicle-data?limit=1500");
                context.commit("setTotalVeh", res.data.data);
                context.commit(SET_VEHICLE, res.data.data);
                return Promise.resolve(res);
            } catch (err) {
                return Promise.reject();
            }
        }
    },
    async [FETCH_VEHICLE_BRANDS](context) {
        try {
            const res = await axios.get("/vehicle-brand");
            context.commit(SET_VEHICLE_BRANDS, res.data.data);
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject();
        }
    },

    [SEARCH_VEHICLE](context, searchKey) {
        const filterd = context.state.totalVehicle.filter((jrn) =>
            jrn.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        context.commit(SET_VEHICLE, filterd);
    },
};

const mutations = {
    [SET_VEHICLE](state, payload) {
        state.vehicles = [];
        for (const item of payload) {
            const vehicleItem = new Vehicle(item);
            state.vehicles.push(vehicleItem);
        }
    },
    [SET_VEHICLE_BRANDS](state, payload) {
        state.vehicleBrands = [];
        for (const item of payload) {
            const vehicleBrandItem = new VehicleBrand(item);
            state.vehicleBrands.push(vehicleBrandItem);
        }
    },
    [SET_SELECTED_VEHICLE_TYPE](state, payload) {
        state.selectedVehicleType = payload;
    },
    [SET_SELECTED_VEHICLE_BRAND](state, payload) {
        state.selectedBrand = payload;
        state.models = [];
        for (const item of state.totalVehicle) {
            if (item.brand_name === payload) {
                state.models.push({
                    ...item
                });
            }
        }
    },
    [SET_SELECTED_CODE](state, payload) {
        state.selectedCode = payload;
    },

    [SET_SELECTED_BRAND](state, payload) {
        state.selectedBrand = payload;
    },

    [SET_SELECTED_TYPE](state, payload) {
        state.selectedType = payload;
    },

    [SET_SELECTED_LENGTH](state, payload) {
        state.selectedLength = payload;
    },

    [SET_SELECTED_HEIGHT](state, payload) {
        state.selectedHeight = payload;
    },
    [SET_SELECTED_MODEL](state, payload) {
        state.selectedModel = payload;
    },

    setTotalVeh(state, payload) {
        state.totalVehicle = [];
        for (const item of payload) {
            const vehicleItem = new Vehicle(item);
            state.totalVehicle.push(vehicleItem);
        }
        localStorage.setItem(STORAGE_VEHICLE, JSON.stringify(state.totalVehicle));
    },
};

const getters = {
    [GET_VEHICLE]: (state) => {
        if (state.selectedVehicleType === "") return state.totalVehicle;
        const filteredItems = [];
        for (const item of state.totalVehicle) {
            item.type === state.selectedVehicleType && filteredItems.push(item);
        }
        return filteredItems;
    },

    [GET_SELECTEDITEM_VEH]: (state) => state.selectedItemVeh,
    [GET_SELECTED_VEHICLE_TYPE]: (state) => state.selectedVehicleType,
    [GET_VEHICLE_BRANDS]: (state) => state.vehicleBrands,
    [GET_FILTERED_VEHICLE_BRANDS]: (state) => {
        const filteredBrands = [];
        for (const item of state.totalVehicle) {
            if (filteredBrands.includes(item.brand_name.toLowerCase())) continue;
            if (
                state.selectedVehicleType !== "" &&
                item.type !== state.selectedVehicleType
            ) {
                continue;
            }
            filteredBrands.push(item.brand_name.toLowerCase());
        }
        return state.vehicleBrands.filter((b) => filteredBrands.includes(b.name.toLowerCase()));
    },
    [GET_SELECTED_VEHICLE_BRAND]: (state) => state.selectedBrand,
    [GET_MODELS]: (state) => state.models,
    [GET_SELECTED_MODEL]: (state) => state.selectedModel,
    [GET_SELECTED_CODE]: (state) => state.selectedCode,
};

export default {
    state,
    actions,
    mutations,
    getters,
};