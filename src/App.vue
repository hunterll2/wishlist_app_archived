<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-toolbar-title v-if="!searching">{{ page_title }}</v-toolbar-title>

      <v-spacer v-if="!searching" />

      <v-btn v-if="page_title === 'Home'" @click="searching = !searching" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-text-field v-if="searching" autofocus clearable hide-details />

      <v-menu
        v-if="!searching"
        bottom
        offset-y
        tile
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item exact :to="{ name: 'Account' }">
            <v-list-item-title> My Account </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title> Sign out </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation shift app>
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
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    searching: false,
  }),

  computed: mapState(["page_title"]),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
