<template>
  <v-menu
    ref="menu"
    v-model="isMenuShown"
    transition="scale-transition"
    allow-overflow
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateMutable"
        :rules="[dateRule]"
        :label="label"
        :disabled="isDisabled"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="dateMutable"
      no-title
      scrollable
    />
  </v-menu>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import dateRule from '@/utils/rules/dateRule';

@Component
export default class DatePickerInput extends Vue {
  @Prop() date!: string;

  @Prop() label!: string;

  @Prop() isDisabled!: false;

  dateRule = dateRule;

  isMenuShown = false;

  get dateMutable(): string {
    return this.date;
  }

  set dateMutable(value: string) {
    this.$emit('input', value);
  }
}
</script>
