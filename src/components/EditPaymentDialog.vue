<template>
  <v-card>
    <v-card-title>
      {{ $t('payment.add') }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="newPayment.name"
        :label="$t('payment.name')"
        :rules="[requiredRule]"
        clearable
      />

      <v-text-field
        v-model="newPayment.amount"
        :label="$t('payment.amount')"
        :rules="[requiredRule]"
        type="number"
      />

      <v-checkbox
        v-model="newPayment.isMonthly"
        :label="$t('payment.isMonthly')"
      />

      <date-picker-input
        :date="newPayment.start"
        :label="newPayment.isMonthly ?
          $t('payment.startDate') :
          $t('payment.date')"
        @input="newPayment.start = $event"
      />

      <date-picker-input
        :date="newPayment.end"
        :label="$t('payment.endDate')"
        :is-disabled="!newPayment.isMonthly"
        @input="newPayment.end = $event"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        text
        @click="$emit('close')"
      >
        {{ $t('common.cancel') }}
      </v-btn>

      <v-btn
        text
        @click="addPayment()"
      >
        {{ $t('payment.addAction') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import DatePickerInput from '@/components/DatePickerInput.vue';

import requiredRule from '@/utils/rules/requiredRule';

@Component({
  components: {
    DatePickerInput,
  },
})
export default class EditPaymentDialog extends Vue {
  private newPayment = {
    name: '',
    amount: null,
    isMonthly: false,
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  };

  requiredRule = requiredRule;

  async addPayment(): Promise<void> {
    // If the payment isn't monthly, end date is the same as start date
    if (!this.newPayment.isMonthly) {
      this.newPayment.end = this.newPayment.start;
    }

    const addPaymentResponse = await axios.post(
      'https://five-year-plan.herokuapp.com/payments/',
      this.newPayment,
    );

    // TODO: Error display
    if (addPaymentResponse.status === 201) {
      this.$store.dispatch('getPayments');
      this.$emit('close');
    }
  }
}
</script>
