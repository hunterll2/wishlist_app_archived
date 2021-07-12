<template>
  <div>
    <app-action-list-item
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :subtitle="item.getCostString"
      :done="item.done == 100"
      :action="item.done + '%'"
      :action-text="item.getProgressString"
      @item-click="$emit('open-item', item)"
      @action-click="$emit('change-status', item)"
    >
      <template v-if="item.total_items == 0" #action>
        <app-button
          :icon="`checkbox-${item.done ? 'marked' : 'blank'}-circle-outline`"
        />
      </template>
    </app-action-list-item>
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
  methods: {},
};
</script>
