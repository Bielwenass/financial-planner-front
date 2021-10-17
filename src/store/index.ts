import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import YearlyData from '@/types/YearlyData';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [
      'authToken',
    ],
  })],

  strict: process.env.NODE_ENV !== 'production',

  state: {
    authToken: '',
    payments: {} as YearlyData,
  },

  mutations: {
    updateValue(state, payload) {
      Object.keys(payload).forEach((propertyName) => {
        Vue.set(state, propertyName, payload[propertyName]);
      });
    },
  },

  actions: {
    async getPayments() {
      const paymentsResponse = await axios.get(
        'https://five-year-plan.herokuapp.com/payments/grouped-by-month',
        {
          params: {
            year: 2021,
          },
        },
      );

      this.commit('updateValue', {
        payments: paymentsResponse.data,
      });
    },
  },
});
