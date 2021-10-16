<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="">
      <v-row>
        <v-col cols="2">
          Month name
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
      <v-list>
        <v-list-item
          v-for="payment of monthlyData.payments"
          :key="payment.id"
        >
          {{ payment.name }}:
          {{ payment.amount }}
        </v-list-item>
      </v-list>
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

@Component
export default class Month extends Vue {
  @Prop() readonly monthlyData: MonthlyData | undefined
}
</script>
