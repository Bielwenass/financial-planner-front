<template>
  <v-row justify="center">
    <v-fade-transition>
      <v-btn
        v-show="Boolean(this.$store.state.authToken)"
        class="mx-2 my-4"
        @click="getPayments()"
      >
        Get payments
      </v-btn>
    </v-fade-transition>

    <v-fade-transition>
      <v-expansion-panels
        v-show="Object.keys(yearlyData.months).length"
        v-model="expandedMonths"
        multiple
      >
        <month
          v-for="(monthData, monthKey) of yearlyData.months"
          :key="monthKey"
          :monthly-data="monthData"
        />
      </v-expansion-panels>
    </v-fade-transition>
  </v-row>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import Month from '@/components/Month.vue';

import MonthlyData from '@/types/MonthlyData';

@Component({
  components: {
    Month,
  },
})
export default class Home extends Vue {
  yearlyData: { months: Record<string, MonthlyData> } = {
    months: {},
  };

  expandedMonths: Array<number> = [];

  async getPayments(): Promise<void> {
    const paymentsResponse = await axios.get(
      'https://five-year-plan.herokuapp.com/payments/grouped-by-month',
      {
        params: {
          year: 2021,
        },
      },
    );

    this.yearlyData = paymentsResponse.data;
  }
}
</script>
