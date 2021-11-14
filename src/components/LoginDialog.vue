<template>
  <v-card>
    <v-card-title>
      {{ $t('auth.signIn') }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="usernameInput"
        :label="$t('auth.username')"
      />

      <v-text-field
        v-model="passwordInput"
        :label="$t('auth.password')"
        type="password"
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
        @click="auth()"
      >
        {{ $t('auth.signIn') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginDialog extends Vue {
  public usernameInput = '';

  public passwordInput = '';

  async auth(): Promise<void> {
    const params = new URLSearchParams();

    params.append('username', this.usernameInput);
    params.append('password', this.passwordInput);

    const authResponse = await axios.post(
      'https://five-year-plan.herokuapp.com/auth/access-token',
      params,
    );

    if (authResponse.status === 200) {
      const authToken = authResponse.data.access_token;

      // @ts-expect-error: Incorrect Axios default typing
      axios.defaults.headers.common = {
        Authorization: `Bearer ${authToken}`,
      };

      this.$store.commit('updateValue', {
        authToken,
      });

      this.$store.dispatch('getUserData');
      this.$store.dispatch('getPayments');
      this.$store.dispatch('getCategories');

      this.$emit('close');
    }
  }
}
</script>
