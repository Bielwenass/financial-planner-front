import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Payment from '@/types/Payment';
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

    async addPayment(_, paymentData: Payment): Promise<boolean> {
      const addPaymentResponse = await axios.post(
        'https://five-year-plan.herokuapp.com/payments/',
        paymentData,
      );

      // TODO: Error display
      if (addPaymentResponse.status === 201) {
        // TODO: Local mutate
        this.dispatch('getPayments');

        return true;
      }

      return false;
    },

    async editPayment(_, paymentData: Payment): Promise<boolean> {
      const editPaymentResponse = await axios.put(
        `https://five-year-plan.herokuapp.com/payments/${paymentData.id}`,
        paymentData,
      );

      // TODO: Error display
      if (editPaymentResponse.status === 200) {
        // TODO: Local mutate
        this.dispatch('getPayments');

        return true;
      }

      return false;
    },

    async deletePayment(_, paymentId: number): Promise<boolean> {
      const deletePaymentResponse = await axios.delete(
        `https://five-year-plan.herokuapp.com/payments/${paymentId}`,
      );

      // TODO: Error display
      if (deletePaymentResponse.status === 200) {
        // TODO: Local mutate
        this.dispatch('getPayments');

        return true;
      }

      return false;
    },
  },
});
