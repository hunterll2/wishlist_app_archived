<template>
  <v-list-item v-ripple two-line @click.stop="$emit('item-click')">
    <v-list-item-action
      v-if="!!this.$slots.action"
      class="pa-0 ma-0 mr-2"
      @click.stop="$emit('action-click')"
    >
      <slot name="action"></slot>
    </v-list-item-action>

    <v-list-item-content :class="{ 'text--secondary': done }">
      <v-list-item-title>
        {{ name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action
      v-if="!this.$slots.action"
      class="align-center align-self-center"
    >
      <span>{{ action }}</span>
      <v-list-item-action-text>
        {{ actionText }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    action: [String, Number],
    actionText: String,
    done: Boolean,
    name: String,
    cost: [String, Number],
    subtitle: String,
  },
  data() {
    return {
      controls: false,
    };
  },
};
</script>
