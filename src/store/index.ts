import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: '',
  },
  mutations: {
    updateValue(state, payload) {
      Object.keys(payload).forEach((propertyName) => {
        Vue.set(state, propertyName, payload[propertyName]);
      });
    },
  },
});
