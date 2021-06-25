<template>
  <div>
    <v-row class="text-center py-6">
      <v-col>
        <div class="text-h2">${{ saving.current_budget }}</div>
        <div class="text-subtitle-1">Current Budget</div>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="text--secondary">
        <div class="text-subtitle-2">${{ saving.monthly_budget }}</div>
        <div class="text-caption">Monthly Budget</div>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <v-row class="flex-column">
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.total_incomes }}</div>
            <div class="text-caption">Monthly Incomes</div>
          </v-col>
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.total_expenses }}</div>
            <div class="text-caption">Monthly Expenses</div>
          </v-col>
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.personal_saving }}</div>
            <div class="text-caption">Personal Saving</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col>
        <v-row class="flex-column">
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.total_incomes }}</div>
            <div class="text-caption">Total Incomes</div>
          </v-col>
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.total_expenses }}</div>
            <div class="text-caption">Total Expenses</div>
          </v-col>
          <v-col class="text--secondary">
            <div class="text-subtitle-2">${{ saving.personal_saving }}</div>
            <div class="text-caption">Total Saving</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("user", ["saving"]),
};
</script>
