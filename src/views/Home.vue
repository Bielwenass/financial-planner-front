<template>
  <v-row
    class="my-4"
    justify="center"
  >
    <v-fade-transition>
      <v-expansion-panels
        v-show="Object.keys(yearlyData).length"
        v-model="expandedMonths"
        multiple
      >
        <month
          v-for="(monthData, monthKey) of yearlyData.months"
          :key="monthKey"
          :monthly-data="{
            ...monthData,
            monthNum: monthKey
          }"
        />
      </v-expansion-panels>
    </v-fade-transition>

    <v-skeleton-loader
      v-show="!Object.keys(yearlyData).length && $store.state.authToken"
      type="list-item@12"
      width="100%"
      elevation="2"
    />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Month from '@/components/Month.vue';

import YearlyData from '@/types/YearlyData';

@Component({
  components: {
    Month,
  },
})
export default class Home extends Vue {
  expandedMonths: Array<number> = [];

  get yearlyData(): YearlyData {
    return this.$store.state.payments;
  }

  created(): void {
    if (this.$store.state.authToken) {
      this.$store.dispatch('getPayments');
    }
  }
}
</script>
