<template>
  <v-sheet :rounded="!small" :elevation="small ? 1 : 2">
    <div
      class="d-flex align-center pa-1"
      :class="{ 'text-body-2': small }"
      v-touch="{
        left: () => $emit('delete-item'),
        right: () => $emit('edit-item'),
      }"
    >
      <!-- Left -->
      <v-btn v-if="isItAParentItem" icon @click="showSubitems = !showSubitems">
        <v-icon>
          mdi-arrow-{{ showSubitems ? "up" : "down" }}-drop-circle-outline
        </v-icon>
      </v-btn>

      <v-btn v-else icon @click="$emit('change-status')">
        <v-icon>
          mdi-checkbox-{{ done ? "marked" : "blank" }}-circle-outline
        </v-icon>
      </v-btn>

      <!-- Center -->
      <div
        class="pl-1"
        :class="{ 'text-decoration-line-through': isItAParentItem }"
        @click="$emit('add-subitem', { parentItem: id })"
      >
        {{ name }}
      </div>

      <v-spacer></v-spacer>

      <div class="pr-2">
        <template v-if="!showSubitems"> ${{ cost }} </template>
        <v-btn
          v-if="showSubitems"
          icon
          @click="$emit('add-subitem', { parentItem: id })"
        >
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="pt-1" v-if="showSubitems">
      <template v-for="item in subitems">
        <wishlist-item
          :name="item.name"
          :cost="item.cost"
          :priority="item.priority"
          :done="item.done"
          :key="item.id"
          small
          @edit-item="$emit('edit-subitem', { parentItem: id, ...item })"
          @delete-item="$emit('delete-subitem', { parentItem: id, ...item })"
          @change-status="
            $emit('change-subitem-status', { parentItem: id, ...item })
          "
        />
      </template>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "WishlistItem",
  props: {
    id: String,
    name: String,
    cost: Number,
    priority: String,
    done: Boolean,
    subitems: Array,
    small: Boolean,
  },
  data() {
    return {
      showSubitems: false,
    };
  },
  computed: {
    isItAParentItem() {
      if (!this.subitems) return false;
      return this.subitems.length ? true : false;
    },
  },
};
</script>
