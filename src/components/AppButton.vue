<template>
  <v-btn
    :block="!!block"
    :text="type == 'text'"
    :small="size == 'small'"
    :x-small="size == 'x-small'"
    :icon="!!icon && !label"
    :color="color"
    :loading="loading"
    class="text-capitalize justify-start"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" :large="iconSize == 'large'" :left="!!label">
      mdi-{{ icon }}
    </v-icon>
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
    iconSize: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    block: Boolean,
  },
};
</script>
