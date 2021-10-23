<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="">
      <v-row>
        <v-col cols="2">
          {{ $t(`months.${monthlyData.monthNum}`) }}
        </v-col>

        <v-col
          cols="2"
          class="font-weight-medium"
          :class="monthlyData.totalSum > 0 ? 'green--text' : 'red--text'"
        >
          {{ monthlyData.totalSum }}
        </v-col>

        <v-col
          cols="2"
          class="green--text"
        >
          +{{ monthlyData.incomesSum }}
        </v-col>

        <v-col
          cols="2"
          class="red--text"
        >
          {{ monthlyData.expensesSum }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="6">
          <v-subheader>
            {{ $t('home.income') }}
          </v-subheader>

          <v-data-table
            :headers="paymentHeaders"
            :items="income"
            disable-pagination
            hide-default-footer
          />
        </v-col>

        <v-col cols="6">
          <v-subheader>
            {{ $t('home.expenses') }}
          </v-subheader>

          <v-data-table
            :headers="paymentHeaders"
            :items="expenses"
            disable-pagination
            hide-default-footer
          />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import MonthlyData from '@/types/MonthlyData';
import Payment from '@/types/Payment';

@Component
export default class Month extends Vue {
  @Prop() readonly monthlyData!: MonthlyData;

  private paymentHeaders = [
    {
      text: this.$t('payment.name'),
      value: 'name',
    }, {
      text: this.$t('payment.amount'),
      value: 'amount',
    },
  ];

  get income(): Array<Payment> {
    return this.monthlyData.payments.filter((e) => e.amount >= 0);
  }

  get expenses(): Array<Payment> {
    return this.monthlyData.payments.filter((e) => e.amount < 0);
  }
}
</script>
