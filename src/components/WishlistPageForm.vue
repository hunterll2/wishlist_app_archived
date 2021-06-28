<template>
  <div style="font-weight: 400 !important; width: 100%">
    <app-text-field
      v-if="type == 'wishlist'"
      ref="wishlistForm_nameField"
      v-model="newItem.name"
      label="Name"
    >
      <template #append>
        <app-button label="Add" color="success" @click="addNewItem" />
      </template>
    </app-text-field>

    <v-row v-else no-gutters align="center">
      <v-col>
        <app-text-field
          ref="wishlistForm_nameField"
          v-model="newItem.name"
          label="Name"
        />
      </v-col>
      <v-col cols="5">
        <app-text-field
          v-model="newItem.cost"
          type="number"
          label="Cost"
          suffix="SAR"
        />
      </v-col>
      <v-col cols="2">
        <app-button label="Add" color="success" @click="addNewItem" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "wishlist",
    },
  },
  data() {
    return {
      newItem: {
        name: "",
        cost: 0,
      },
    };
  },
  methods: {
    addNewItem() {
      if (this.newItem.name.length > 1) {
        if (this.type == "item" && this.newItem.cost < 50) return;
        else
          this.$emit("add-item", {
            name: this.newItem.name,
            cost: this.newItem.cost,
          });
      }
      this.newItem.name = "";
      this.newItem.cost = 0;
      this.$refs.wishlistForm_nameField.$children[0].focus();
    },
  },
};
</script>
