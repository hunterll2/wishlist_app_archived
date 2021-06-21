<template>
  <v-row>
    <v-col cols="9">
      <v-btn
        block
        depressed
        tile
        text
        class="justify-start text-capitalize"
        @click.native="$emit('return')"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        <template>{{ title }}</template>
      </v-btn>
    </v-col>

    <v-col class="text-right">
      <v-menu bottom offset-y tile transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="$emit('edit')">
            <v-list-item-title> Edit </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('delete')">
            <v-list-item-title> Delete </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
