import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  strict: process.env.NODE_ENV !== 'production',

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
