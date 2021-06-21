<template>
  <v-sheet rounded elevation="2">
    <v-container>
      <v-row class="px-2 pb-2">
        <v-col> {{ name }} </v-col>
        <v-spacer />
        <v-col class="text-right text-subtitle-2"> ${{ computedCost }} </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-divider />
        </v-col>
      </v-row>

      <v-row no-gutters class="pt-2 text-caption text--secondary">
        <v-col cols="3" class="text-center text-capitalize">
          {{ priority }}
        </v-col>

        <v-col cols="1" class="text-center">
          <v-icon x-small>mdi-circle-medium</v-icon>
        </v-col>

        <v-col cols="3" class="text-center text-capitalize">
          {{ totalItems }} Items
        </v-col>

        <v-col cols="1" class="text-center">
          <v-icon x-small>mdi-circle-medium</v-icon>
        </v-col>

        <v-col cols="3" class="text-center text-capitalize">
          {{ progress }}% done
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  props: {
    name: String,
    totalCost: Number,
    totalItems: Number,
    priority: String,
    progress: Number,
    dueDate: Date,
    done: Boolean,
  },
  computed: {
    computedCost() {
      let costArray = this.totalCost.toString().split("");
      // let costLength = costArray.length;

      if (costArray.length === 4) costArray.splice(1, 0, ",");
      else if (costArray.length === 5) costArray.splice(2, 0, ",");
      else if (costArray.length === 6) costArray.splice(3, 0, ",");

      return costArray.join("");
    },
  },
};
</script>
