<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-dialog
        v-if="!isLoggedIn"
        v-model="isDialogShown"
        max-width="300px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            light
            v-bind="attrs"
            v-on="on"
          >
            {{ $t('auth.signIn') }}
          </v-btn>
        </template>

        <login-dialog @close="isDialogShown = false" />
      </v-dialog>

      <span
        v-else
        class="white--text text-h6"
      >
        {{ $t('auth.signedIn') }}
      </span>
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
  public isDialogShown = false;

  get isLoggedIn(): boolean {
    return Boolean(this.$store.state.authToken);
  }
}

</script>
