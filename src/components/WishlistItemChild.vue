<template>
  <v-sheet elevation="1">
    <div
      class="d-flex align-center pa-1 text-body-2"
      v-touch="{
        left: () => $emit('delete-item'),
        right: () => $emit('edit-item'),
      }"
    >
      <!-- Left -->
      <v-btn icon @click="$emit('change-status', !done)">
        <v-icon>
          mdi-checkbox-{{ done ? "marked" : "blank" }}-circle-outline
        </v-icon>
      </v-btn>

      <!-- Center -->
      <div class="pl-1" @click="$emit('add-subitem')">
        {{ name }}
      </div>

      <v-spacer></v-spacer>

      <div class="pr-2">
        <template> ${{ cost }} </template>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "WishlistItemChild",
  props: {
    name: String,
    cost: Number,
    priority: String,
    done: Boolean,
  },
};
</script>
