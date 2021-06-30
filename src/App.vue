<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation v-if="getAuthUser" app grow shift>
      <v-btn exact :to="{ name: 'Home' }">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'Saving' }">
        <span>Saving</span>
        <v-icon>mdi-cash</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'Planner' }">
        <span>Planner</span>
        <v-icon>mdi-calendar</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'Account' }">
        <span>Account</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: mapGetters("auth", ["getAuthUser"]),
};
</script>

<style>
.v-application--wrap .v-item-group.v-bottom-navigation .v-btn {
  background-color: transparent;
  height: inherit;
  max-width: 168px;
  min-width: 80px;
}
</style>
