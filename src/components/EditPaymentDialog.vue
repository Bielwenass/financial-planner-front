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

        <v-select
          v-model="paymentData.categoryId"
          :items="categories"
          item-text="name"
          item-value="id"
          :label="$t('category.selectLabel')"
        >
          <template v-slot:item="{ item }">
            <div>
              <v-icon
                :color="item.color"
                size="20px"
                v-text="'mdi-circle'"
              />

              <span class="ml-1 category-select-text">
                {{ item.name }}
              </span>
            </div>
          </template>
        </v-select>

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
        <v-btn
          v-if="actionType === 'edit'"
          color="red"
          text
          @click="deletePayment()"
        >
          {{ $t('common.delete') }}
        </v-btn>

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

import Category from '@/types/Category';
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
    categoryId: null,
    isMonthly: false,
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  };

  private paymentData = {} as Payment;

  private isLoading = false;

  requiredRule = requiredRule;

  get categories(): Array<Category> {
    return [...this.$store.state.categories.values()];
  }

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

  async deletePayment(): Promise<void> {
    this.isLoading = true;

    const success = await this.$store.dispatch('deletePayment', this.paymentData.id);

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

<style lang="scss" scoped>

  .category-select-text {
    vertical-align: text-top;
  }
</style>
