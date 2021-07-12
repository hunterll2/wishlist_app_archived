<template>
  <div>
    <app-action-list-item-edit
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :cost="item.cost"
      @update-item="emitUpdateRequest(item, $event)"
    >
      <template #action>
        <app-button icon="close" @click="$emit('delete-item', item)" />
      </template>
    </app-action-list-item-edit>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitUpdateRequest(item, newItem) {
      this.$emit("update-item", {
        id: item.id,
        ...newItem,
      });
    },
  },
};
</script>
