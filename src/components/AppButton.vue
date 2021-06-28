<template>
  <v-btn
    :block="!!block"
    :text="type == 'text'"
    :tile="type == 'tile'"
    :rounded="type == 'button-icon'"
    :small="size == 'small'"
    :x-small="size == 'x-small'"
    :icon="!!icon && !label && type != 'button-icon'"
    :color="color"
    :loading="loading"
    class="text-capitalize"
    :class="{ 'justify-start': type != 'button-icon' }"
    @click="$emit('click')"
  >
    <v-icon
      v-if="icon"
      :large="iconSize == 'large'"
      :small="iconSize == 'small'"
      :left="!!label"
    >
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
