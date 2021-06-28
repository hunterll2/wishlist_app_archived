<template>
  <div>
    <div v-for="item in items" :key="item.label">
      <v-icon left> mdi-{{ item.icon }} </v-icon>
      {{ item.label }}
      <span class="float-right">{{ item.value }}</span>
    </div>
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
};
</script>
