<template>
  <v-dialog
    :value="isDisplayed"
    max-width="500px"
    @input="closeDialog()"
  >
    <v-card>
      <v-card-title>
        {{ actionCardTitleString }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="paymentData.name"
          :label="$t('payment.name')"
          :rules="[requiredRule]"
          clearable
        />

        <v-text-field
          v-model="paymentData.amount"
          :label="$t('payment.amount')"
          :rules="[requiredRule]"
          type="number"
        />

        <v-checkbox
          v-model="paymentData.isMonthly"
          :label="$t('payment.isMonthly')"
        />

        <date-picker-input
          :date="paymentData.start"
          :label="paymentData.isMonthly ?
            $t('payment.startDate') :
            $t('payment.date')"
          @input="paymentData.start = $event"
        />

        <date-picker-input
          :date="paymentData.end"
          :label="$t('payment.endDate')"
          :is-disabled="!paymentData.isMonthly"
          @input="paymentData.end = $event"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          @click="closeDialog()"
        >
          {{ $t('common.cancel') }}
        </v-btn>

        <v-btn
          color="primary"
          :loading="isLoading"
          :disabled="isLoading"
          @click="submit()"
        >
          {{ actionNameString }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import DatePickerInput from '@/components/DatePickerInput.vue';

import Payment from '@/types/Payment';

import requiredRule from '@/utils/rules/requiredRule';

@Component({
  components: {
    DatePickerInput,
  },
})
export default class EditPaymentDialog extends Vue {
  @Prop() readonly isDisplayed!: boolean;

  @Prop() readonly actionType!: 'add' | 'edit';

  @Prop() readonly paymentDataInitial!: Payment;

  private newPaymentData = {
    id: 0,
    name: '',
    amount: null as unknown as number,
    isMonthly: false,
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  };

  private paymentData = {} as Payment;

  private isLoading = false;

  requiredRule = requiredRule;

  get actionCardTitleString(): string {
    switch (this.actionType) {
      case 'add':
        return this.$t('payment.add') as string;
      case 'edit':
        return this.$t('payment.edit') as string;
      default:
        return '';
    }
  }

  get actionNameString(): string {
    switch (this.actionType) {
      case 'add':
        return this.$t('payment.addAction') as string;
      case 'edit':
        return this.$t('payment.editAction') as string;
      default:
        return '';
    }
  }

  created(): void {
    // Init mutable paymentData
    if (this.actionType === 'add') {
      this.paymentData = this.newPaymentData;
    } else {
      this.paymentData = {
        ...this.paymentDataInitial,
        isMonthly: this.paymentDataInitial?.start !== this.paymentDataInitial?.end,
      };
    }
  }

  async submit(): Promise<void> {
    // If the payment isn't monthly, end date is the same as start date
    if (!this.paymentData.isMonthly) {
      this.paymentData.end = this.paymentData.start;
    }

    this.isLoading = true;

    let success;

    if (this.actionType === 'add') {
      success = await this.$store.dispatch('addPayment', this.paymentData);
    } else if (this.actionType === 'edit') {
      success = await this.$store.dispatch('editPayment', this.paymentData);
    }

    if (success) {
      this.closeDialog();
    } else {
      this.isLoading = false;
    }
  }

  closeDialog(): void {
    this.$emit('update:isDisplayed', false);
  }
}
</script>
