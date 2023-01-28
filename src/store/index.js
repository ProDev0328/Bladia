import { createStore } from "vuex";
import auth from "./auth";
import journey from "../store/ferry/journey";
import transporter from "../store/data/transporter/transporter";
import vehicle from "../store/ferry/vehicle";
import search from "./search";
import result from "./result";
import lang from "./lang";
import currency from "./currency";
import booking from "./booking";

export default createStore({
  modules: {
    auth,
    currency,
    journey,
    transporter,
    lang,
    result,
    search,
    vehicle,
    booking,
  },
});
