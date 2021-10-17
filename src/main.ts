import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import i18n from './i18n';
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
  i18n,
  render: (h) => h(App),
}).$mount('#app');
