import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VCalendar from "v-calendar";
import AppLink from "./components/AppLink.vue";


import {
    createMetaManager
} from 'vue-meta'


import './assets/css/app.scss'
import VueGtag from "vue-gtag";

const app = createApp(App);
app.component('app-link', AppLink);
app.use(router)
    .use(store)
    .use(createMetaManager())
    .use(VCalendar, {})
    .use(VueGtag, {
        config: {
            id: process.env.VUE_APP_GTAG_ID
        }
    })
    .mount("#app");