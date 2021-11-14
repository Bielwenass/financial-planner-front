<template>
  <v-row
    class="my-6"
  >
    <v-col>
      <div class="text-h4 mb-6">
        {{ $t('nav.payments') }}
      </div>

      <v-btn
        v-show="this.$store.state.authToken"
        color="primary"
        large
        class="mb-6"
        @click="isPaymentDialogShown = true"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        {{ $t('payment.add') }}
      </v-btn>

      <edit-payment-dialog
        v-if="isPaymentDialogShown"
        :is-displayed.sync="isPaymentDialogShown"
        action-type="add"
      />

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
    </v-col>
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
