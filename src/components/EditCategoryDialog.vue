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
          v-model="categoryData.name"
          :label="$t('category.name')"
          :rules="[requiredRule]"
          clearable
        />

        <v-color-picker
          v-model="categoryData.color"
          class="mt-4"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-if="actionType === 'edit'"
          color="red"
          text
          @click="deleteCategory()"
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

import Category from '@/types/Category';

import getRandomColor from '@/utils/getRandomColor';
import requiredRule from '@/utils/rules/requiredRule';

@Component
export default class EditCategoryDialog extends Vue {
  @Prop() readonly isDisplayed!: boolean;

  @Prop() readonly actionType!: 'add' | 'edit';

  @Prop() readonly categoryDataInitial!: Category;

  private newCategoryData = {
    id: 0,
    name: '',
    color: getRandomColor(),
  };

  private categoryData = {} as Category;

  private isLoading = false;

  requiredRule = requiredRule;

  get actionCardTitleString(): string {
    switch (this.actionType) {
      case 'add':
        return this.$t('category.add') as string;
      case 'edit':
        return this.$t('category.edit') as string;
      default:
        return '';
    }
  }

  get actionNameString(): string {
    switch (this.actionType) {
      case 'add':
        return this.$t('category.addAction') as string;
      case 'edit':
        return this.$t('category.editAction') as string;
      default:
        return '';
    }
  }

  created(): void {
    // Init mutable categoryData
    if (this.actionType === 'add') {
      this.categoryData = this.newCategoryData;
    } else {
      this.categoryData = {
        ...this.categoryDataInitial,
      };
    }
  }

  async submit(): Promise<void> {
    this.isLoading = true;

    let success;

    if (this.actionType === 'add') {
      success = await this.$store.dispatch('addCategory', this.categoryData);
    } else if (this.actionType === 'edit') {
      success = await this.$store.dispatch('editCategory', this.categoryData);
    }

    if (success) {
      this.closeDialog();
    } else {
      this.isLoading = false;
    }
  }

  async deleteCategory(): Promise<void> {
    this.isLoading = true;

    const success = await this.$store.dispatch('deleteCategory', this.categoryData.id);

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
