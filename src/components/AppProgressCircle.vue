<template>
  <div class="d-flex">
    <v-progress-circular
      :value="percentage"
      :size="size"
      :width="width"
      :color="color"
      buffer-value="0"
    />
    <div class="text--secondary ml-2">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 21,
    },
    width: {
      type: Number,
      default: 3,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>
