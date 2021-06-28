<template>
  <div>
    <app-action-list-item
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :subtitle="computedCost(item) + ' SAR'"
      :done="item.done"
      :action-text="computedDoneUndone(item)"
      :action="computedProgress(item)"
      @item-click="$emit('open-item', item)"
      @action-click="$emit('change-status', item)"
    >
      <template v-if="item.done !== undefined" #action>
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
  methods: {
    computedDoneUndone(item) {
      if (item.total_items != undefined) {
        return `${item.total_done} of ${item.total_items}`;
      } else {
        return undefined;
      }
    },
    computedProgress(item) {
      if (item.total_items)
        return (item.total_done / item.total_items) * 100 + "%";
      else if (item.total_items != undefined) return 0 + "%";
      else return undefined;
    },
    computedCost(item) {
      const cost = item.cost || item.total_cost;

      let costArray = cost.toString().split("");
      // let costLength = costArray.length;

      if (costArray.length === 4) costArray.splice(1, 0, ",");
      else if (costArray.length === 5) costArray.splice(2, 0, ",");
      else if (costArray.length === 6) costArray.splice(3, 0, ",");

      return costArray.join("");
    },
  },
};
</script>
