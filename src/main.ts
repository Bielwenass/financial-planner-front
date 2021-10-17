import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// @ts-expect-error: Incorrect Axios default typing
axios.defaults.headers.common = {
  Authorization: `Bearer ${store.state.authToken}`,
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
