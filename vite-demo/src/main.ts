import { createApp } from "vue";
import App from "./App.vue";
import VueHighcharts from "./directive";
import router from "./router";

const app = createApp(App);
app.use(VueHighcharts)
app.use(router);
app.mount("#app");
