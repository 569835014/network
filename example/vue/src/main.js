import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { INetwork } from 'network';
import Axios from "axios";
import { Notice } from 'iview';
import 'iview/dist/styles/iview.css'
INetwork.axiosCreate({},Axios);
INetwork.Notice = Notice;
const work = new INetwork();
work.Notice.success({
  title:'1111'
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
