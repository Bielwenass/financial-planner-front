<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-container>
        <v-row>
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Home' }"
          >
            <v-btn
              text
              :disabled="!isLoggedIn"
              @click="navigate"
            >
              {{ $t('nav.payments') }}
            </v-btn>
          </router-link>

          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Categories' }"
            class="ml-4"
          >
            <v-btn
              text
              :disabled="!isLoggedIn"
              @click="navigate"
            >
              {{ $t('nav.categories') }}
            </v-btn>
          </router-link>

          <v-spacer />

          <div
            v-if="isLoggedIn"
            class="user-email-display text--secondary"
          >
            {{ $store.state.userEmail || $t('auth.signedIn') }}
          </div>

          <v-dialog
            v-else
            v-model="isLoginDialogShown"
            max-width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t('auth.signIn') }}
              </v-btn>
            </template>

            <login-dialog @close="isLoginDialogShown = false" />
          </v-dialog>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LoginDialog from '@/components/LoginDialog.vue';

@Component({
  components: {
    LoginDialog,
  },
})
export default class Base extends Vue {
  public isLoginDialogShown = false;

  get isLoggedIn(): boolean {
    return Boolean(this.$store.state.authToken);
  }

  created(): void {
    if (this.isLoggedIn) {
      this.$store.dispatch('getCategories');
    }
  }
}

</script>

<style lang="scss" scoped>

.user-email-display {
  line-height: 36px;
}
</style>
