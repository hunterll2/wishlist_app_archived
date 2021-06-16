<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Saving",
  components: {},
  methods: mapActions(["updatePageTitle"]),
  created() {
    this.updatePageTitle("Saving");
  },
};
</script>

<style></style>
