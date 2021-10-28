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
            sort-by="amount"
            :sort-desc="true"
            disable-pagination
            hide-default-footer
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editPayment(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletePayment(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="6">
          <v-subheader>
            {{ $t('home.expenses') }}
          </v-subheader>

          <v-data-table
            :headers="paymentHeaders"
            :items="expenses"
            sort-by="amount"
            :sort-desc="false"
            disable-pagination
            hide-default-footer
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editPayment(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletePayment(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <edit-payment-dialog
        v-if="isPaymentDialogShown"
        :is-displayed.sync="isPaymentDialogShown"
        action-type="edit"
        :payment-data-initial="editedPayment"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import EditPaymentDialog from '@/components/EditPaymentDialog.vue';

import MonthlyData from '@/types/MonthlyData';
import Payment from '@/types/Payment';

@Component({
  components: {
    EditPaymentDialog,
  },
})
export default class Month extends Vue {
  @Prop() readonly monthlyData!: MonthlyData;

  private paymentHeaders = [
    {
      text: this.$t('payment.name'),
      value: 'name',
    }, {
      text: this.$t('payment.amount'),
      value: 'amount',
    }, {
      text: this.$t('home.actions'),
      value: 'actions',
      sortable: false,
    },
  ];

  private isPaymentDialogShown = false;

  private editedPayment = {} as Payment;

  get income(): Array<Payment> {
    return this.monthlyData.payments.filter((e) => e.amount >= 0);
  }

  get expenses(): Array<Payment> {
    return this.monthlyData.payments.filter((e) => e.amount < 0);
  }

  editPayment(payment: Payment): void {
    this.editedPayment = payment;
    this.isPaymentDialogShown = true;
  }

  deletePayment(payment: Payment): void {
    this.$store.dispatch('deletePayment', payment.id);
  }
}
</script>
