import axios from "axios";
import { isLocal } from "./plugins/utility";
/* Ferry Api from www.apiferry.io Give Price, Availlability */

const customHeaders = {
  "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const baseUrl = isLocal()
  ? "http://" + window.location.host
  : process.env.VUE_APP_API_URL;
const instance = axios.create({
  baseURL: baseUrl,
  headers: customHeaders,
  params: {},
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.language_id) {
      config.params["lang"] = userData.language_id;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
