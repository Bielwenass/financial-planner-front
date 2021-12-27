import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Category from '@/types/Category';
import Payment from '@/types/Payment';
import YearlyData from '@/types/YearlyData';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [
      'authToken',
      'userEmail',
    ],
  })],

  strict: process.env.NODE_ENV !== 'production',

  state: {
    authToken: '',
    userEmail: '',
    payments: {} as YearlyData,
    categories: {} as Map<number, Category>,
    areCategoriesLoaded: false,
  },

  mutations: {
    updateValue(state, payload) {
      Object.keys(payload).forEach((propertyName) => {
        Vue.set(state, propertyName, payload[propertyName]);
      });
    },
  },

  actions: {
    async getUserData() {
      const userResponse = await axios.get(
        'https://five-year-plan.herokuapp.com/users/me',
      );

      this.commit('updateValue', {
        userEmail: userResponse.data.email,
      });
    },

    async getPayments() {
      const currentYear = new Date().getFullYear();

      const yearsToGet = [
        currentYear - 1,
        currentYear,
        currentYear + 1,
      ];

      const yearsRequests = yearsToGet.map((year) => axios.get(
        'https://five-year-plan.herokuapp.com/payments/grouped-by-month',
        {
          params: {
            year,
          },
        },
      ));

      let paymentsResponses = await Promise.all(yearsRequests);

      // TODO: Remove clumsy year assign
      for (let i = 0; i < yearsToGet.length; i += 1) {
        if (paymentsResponses[i].data) {
          paymentsResponses[i].data.year = yearsToGet[i];
        }
      }

      // Filter out years with null data
      paymentsResponses = paymentsResponses.filter((e) => e.data);

      this.commit('updateValue', {
        payments: paymentsResponses.reduce((acc, cur) => ({
          ...acc, [cur.data.year]: cur.data,
        }), {}),
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
      if (deletePaymentResponse.status === 204) {
        // TODO: Local mutate
        this.dispatch('getPayments');

        return true;
      }

      return false;
    },

    async getCategories() {
      const categoriesResponse = await axios.get(
        'https://five-year-plan.herokuapp.com/categories/',
      );

      const categoriesMap = new Map(
        categoriesResponse.data.map((entry: Category) => [entry.id, {
          ...entry,
        }]),
      );

      this.commit('updateValue', {
        categories: categoriesMap,
        areCategoriesLoaded: true,
      });
    },

    async addCategory(_, categoryData: Category): Promise<boolean> {
      const addCategoryResponse = await axios.post(
        'https://five-year-plan.herokuapp.com/categories/',
        categoryData,
      );

      // TODO: Error display
      if (addCategoryResponse.status === 201) {
        // TODO: Local mutate
        this.dispatch('getCategories');

        return true;
      }

      return false;
    },

    async editCategory(_, categoryData: Category): Promise<boolean> {
      const editCategoryResponse = await axios.put(
        `https://five-year-plan.herokuapp.com/categories/${categoryData.id}`,
        categoryData,
      );

      // TODO: Error display
      if (editCategoryResponse.status === 200) {
        // TODO: Local mutate
        this.dispatch('getCategories');

        return true;
      }

      return false;
    },

    async deleteCategory(_, categoryId: number): Promise<boolean> {
      const deleteCategoryResponse = await axios.delete(
        `https://five-year-plan.herokuapp.com/categories/${categoryId}`,
      );

      // TODO: Error display
      if (deleteCategoryResponse.status === 204) {
        // TODO: Local mutate
        this.dispatch('getCategories');

        return true;
      }

      return false;
    },
  },
});
