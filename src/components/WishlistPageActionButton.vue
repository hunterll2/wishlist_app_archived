<template>
  <v-fab-transition>
    <v-btn
      absolute
      bottom
      right
      fab
      color="success"
      class="mb-10"
      @click="$emit('add-action')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {};
</script>

<style></style>
