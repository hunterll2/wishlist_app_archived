<template>
  <v-btn
    text
    :small="size == 'small'"
    :x-small="size == 'x-small'"
    :icon="!!icon"
    :color="color"
    :loading="loading"
    class="text-capitalize"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" :left="label">mdi-{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
    color: String,
    loading: Boolean,
    size: {
      type: String,
      default: "small",
    },
  },
};
</script>
