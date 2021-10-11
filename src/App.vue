<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import get, { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import { Monthly } from './types/Monthly';

@Component
export default class Root extends Vue {
  // @Prop() public monthlys!: Array<number>;

  monthlys: Array<Monthly> = [];

  async created(): Promise<void> {
    const testResp = await get('https://five-year-plan.herokuapp.com/monthlys/') as AxiosResponse;

    this.monthlys = testResp.data;
    console.log(this.monthlys);
  }
}
</script>
