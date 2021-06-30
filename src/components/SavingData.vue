<template>
  <div>
    <v-row no-gutters class="flex-column">
      <v-col class="text-h6">Incomes</v-col>
      <v-col>
        <saving-view-items
          :items="savingData.incomes"
          @done="saveChanges('incomes', $event)"
        />
      </v-col>
    </v-row>

    <v-row no-gutters class="flex-column">
      <v-col class="text-h6">Expenses</v-col>
      <v-col>
        <saving-view-items
          :items="savingData.expenses"
          @done="saveChanges('expenses', $event)"
        />
      </v-col>
    </v-row>

    <v-row class="flex-column">
      <v-col class="text-h6">Personal Saving</v-col>
      <v-col>
        <app-text-field
          v-model="savingData.personal_saving"
          label="Personal Saving"
          type="number"
          shape="box"
          :stepper="true"
          :non-negative="true"
          @increase="increasePersonalSaving"
          @decrease="decreasePersonalSaving"
          @change="updatePersonalSaving"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    SavingViewItems: () => import("./SavingViewItems.vue"),
  },
  data() {
    return {
      savingData: {},
      personalSaving: 0,
    };
  },
  computed: mapGetters("user", ["getUserSavingData"]),
  created() {
    this.savingData = this.getUserSavingData;
  },
  methods: {
    updatePersonalSaving() {
      this.$store.dispatch("user/updatePersonalSaving", {
        newAmount: this.savingData.personal_saving,
      });
    },
    increasePersonalSaving() {
      this.savingData.personal_saving += 100;
    },
    decreasePersonalSaving() {
      if (this.savingData.personal_saving >= 0)
        this.savingData.personal_saving -= 100;
    },
    saveChanges(type, payload) {
      const promises = [];

      payload.itemsToAdded.forEach((item) => {
        promises.push(
          this.$store.dispatch("user/addSavingDataItem", {
            type,
            id: item.id,
            name: item.name,
            amount: item.amount,
          })
        );
      });

      payload.itemsToUpdate.forEach((item) => {
        promises.push(
          this.$store.dispatch("user/updateSavingDataItem", {
            type,
            id: item.id,
            name: item.name,
            amount: item.amount,
          })
        );
      });

      payload.itemsToDelete.forEach((item) => {
        promises.push(
          this.$store.dispatch("user/deleteSavingDataItem", {
            type,
            id: item.id,
          })
        );
      });

      Promise.all(promises).then(() => {
        this.$bus.$emit("saving-saving_changes_done");
      });
    },
  },
};
</script>
