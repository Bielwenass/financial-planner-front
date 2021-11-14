<template>
  <v-row
    class="my-6"
  >
    <v-col>
      <div class="text-h4 mb-6">
        {{ $t('nav.categories') }}
      </div>

      <v-fade-transition>
        <v-list
          v-show="$store.state.areCategoriesLoaded"
          class="categories-list"
          flat
        >
          <v-list-item-group>
            <v-list-item
              v-for="[categoryId, entry] of categories"
              :key="categoryId"
              @click="enableCategoryDialog('edit', entry)"
            >
              <v-list-item-icon>
                <v-icon
                  :color="entry.color"
                  v-text="'mdi-circle'"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="entry.name" />
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="enableCategoryDialog('add')">
              <v-list-item-icon>
                <v-icon
                  v-text="'mdi-plus'"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Add new'" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-fade-transition>

      <edit-category-dialog
        v-if="editedCategory.isDialogShown"
        :is-displayed.sync="editedCategory.isDialogShown"
        :action-type="editedCategory.actionType"
        :category-data-initial="editedCategory.data"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EditCategoryDialog from '@/components/EditCategoryDialog.vue';

import Category from '@/types/Category';

@Component({
  components: {
    EditCategoryDialog,
  },
})
export default class Home extends Vue {
  get categories(): Map<number, Category> {
    return this.$store.state.categories;
  }

  private editedCategory = {
    isDialogShown: false,
    actionType: '',
    data: {} as Category | undefined,
  };

  enableCategoryDialog(
    actionType: 'add' | 'edit',
    categoryData?: Category,
  ): void {
    this.editedCategory = {
      isDialogShown: true,
      actionType,
      data: categoryData,
    };
  }
}
</script>

<style lang="scss">

.categories-list {
  width: 100%;
  max-width: 500px;
}
</style>
