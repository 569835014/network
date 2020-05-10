import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { INetwork } from "network";
import Axios from "axios";
import { Notice } from "iview";
import "iview/dist/styles/iview.css";
import Api from "./network/Api";
INetwork.axiosCreate(
  {
    baseURL: "/api"
  },
  Axios
);

INetwork.Notice = Notice;
Vue.config.productionTip = false;
Api.getDiscList({
    boolean:true
}).then((res)=>{
    console.info(res)
});
window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
