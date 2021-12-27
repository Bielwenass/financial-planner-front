<template>
  <v-row
    class="my-6"
  >
    <v-col>
      <div class="text-h3 mb-6">
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

      <template v-for="yearData of allYearsData">
        <div :key="yearData.year">
          <div class="text-h4 mt-8 mb-4">
            {{ yearData.year }}
          </div>

          <v-fade-transition>
            <v-expansion-panels
              v-show="Object.keys(allYearsData).length"
              v-model="expandedMonths[yearData.year]"
              multiple
            >
              <month
                v-for="(monthData, monthKey) of yearData.months"
                :key="monthKey"
                :monthly-data="{
                  ...monthData,
                  monthNum: monthKey
                }"
              />
            </v-expansion-panels>
          </v-fade-transition>
        </div>
      </template>

      <v-skeleton-loader
        v-show="!Object.keys(allYearsData).length && $store.state.authToken"
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
  expandedMonths: Record<string, number[]> = {};

  isPaymentDialogShown = false;

  get allYearsData(): Record<number, YearlyData> {
    return this.$store.state.payments;
  }

  async created(): Promise<void> {
    if (this.$store.state.authToken) {
      await this.$store.dispatch('getPayments');

      // Add properties to expandedMonths for every year present
      Object.keys(this.$store.state.payments).forEach((e) => {
        this.expandedMonths[e] = [];
      });
    }
  }
}
</script>
