import axios from "axios";
import { isLocal } from "./plugins/utility";
/* Booking Api from bein.travel To save booking in backend */

/*
let customHeaders = {
  //authorization: `Bearer ${process.env.VUE_APP_AGENCY_API_ID}`,
  "content-type": "application/json",
};
*/

let customHeaders = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const baseUrl = isLocal()
  ? "http://" + window.location.host
  : process.env.VUE_APP_BOOKING_URL;
const instance = axios.create({
  baseURL: baseUrl,
  headers: customHeaders,
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      config.headers["Authorization"] = `Bearer ${userData.token}`;
    }
    if (userData && userData.language_id) {
      config.headers["language"] = userData.language_id;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
