
import Vue from 'vue';
import App from './App.vue';
import Vuelidate from "vuelidate";
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import store from "@/store";
import NowUiKit from './plugins/now-ui-kit';

Vue.config.productionTip = false;

Vue.use(NowUiKit);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
