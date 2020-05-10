import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import router from "./router/router";
import vuetify from './plugins/vuetify';
import VueFullPage from 'vue-fullpage.js';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import 'animate.css/animate.css'


Vue.config.productionTip = false;

Vue.use(VueLodash, {lodash: lodash})
Vue.use(VueFullPage);
Vue.use(new VueSocketIO({debug: true, connection: 'http://localhost:3000/'}));


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
