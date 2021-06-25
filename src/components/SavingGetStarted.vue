<template>
  <v-container>
    <v-row>
      <v-col class="text-h4"> Welcome </v-col>
    </v-row>
    <v-row>
      <v-col class="text-body-1">
        <b>Saving</b> is't a feature that helps you to manage your
        incomes/expenses so that you can keep track of it, know how you save and
        spend, and show when you can reach your goals.
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col>
        <v-btn block tile large color="success" @click="$emit('go')">
          Let's get started
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
