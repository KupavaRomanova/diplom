import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import "./theme/variables.css";
import authPlugin from "../auth";
import axios from "axios";
import './index.css'
import $api from "@/http";

const app = createApp(App)
    .use(authPlugin)
    .use(IonicVue, {
        mode: "md",
    })
    .use(router);

router.isReady().then(() => {
    app.mount("#app");
});


axios.interceptors.request.use(
    (config) => {

        if (localStorage.token) {
            config.headers.Authorization = `Bearer ${localStorage.token}`;
        }
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

