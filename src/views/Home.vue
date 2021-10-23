<template>
  <v-row
    class="my-6"
    justify="center"
  >
    <v-dialog
      v-show="this.$store.state.authToken"
      v-model="isPaymentDialogShown"
      max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          large
          class="mb-6"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('payment.add') }}
        </v-btn>
      </template>

      <edit-payment-dialog @close="isPaymentDialogShown = false" />
    </v-dialog>

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

import EditPaymentDialog from '@/components/EditPaymentDialog.vue';
import Month from '@/components/Month.vue';

import YearlyData from '@/types/YearlyData';

@Component({
  components: {
    EditPaymentDialog,
    Month,
  },
})
export default class Home extends Vue {
  expandedMonths: Array<number> = [];

  isPaymentDialogShown = false;

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
