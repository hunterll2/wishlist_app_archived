<template>
  <v-sheet :rounded="small ? false : true" :elevation="small ? 1 : 2">
    <div class="d-flex align-center pa-1" :class="{ 'text-body-2': small }">
      <v-btn v-if="isItAParentItem" icon @click="showSubitems = !showSubitems">
        <v-icon>
          mdi-arrow-{{ showSubitems ? "up" : "down" }}-drop-circle-outline
        </v-icon>
      </v-btn>

      <v-btn v-else icon>
        <v-icon>
          mdi-checkbox-{{ done ? "marked" : "blank" }}-circle-outline
        </v-icon>
      </v-btn>

      <div
        class="pl-1"
        :class="{ 'text-decoration-line-through': isItAParentItem }"
      >
        {{ name }}
      </div>

      <v-spacer></v-spacer>

      <div class="pr-2">${{ cost }}</div>
    </div>

    <div class="pt-1" v-if="showSubitems">
      <template v-for="item in items">
        <wishlist-item
          :name="item.name"
          :cost="item.cost"
          :priority="item.priority"
          :done="item.done"
          :key="item.id"
          small
        />
      </template>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "WishlistItem",
  props: {
    name: String,
    cost: Number,
    priority: Number,
    completionDate: Date,
    done: Boolean,
    items: Array,
    small: Boolean,
  },
  data() {
    return {
      showSubitems: false,
    };
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
    isItAParentItem() {
      return this.items ? true : false;
    },
  },
};
</script>
