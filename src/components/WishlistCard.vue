<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col> {{ title }} </v-col>
        <v-col cols="4" class="text-right"> ${{ totalCost }} </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <v-row justify="start">
        <v-col cols="3">{{ priorityString }}</v-col>
        <v-col cols="6">{{ progress }}% completed</v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    totalCost: Number,
    priority: Number,
    progress: Number,
    completionDate: Date,
    completed: Boolean,
  },
  computed: {
    priorityString() {
      switch (this.priority) {
        case -1:
          return "Low";
        case 1:
          return "High";
        default:
          return "Normal";
      }
    },
  },
};
</script>
