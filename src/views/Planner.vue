<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Planner",
  components: {},
  methods: mapActions(["updatePageTitle"]),
  created() {
    this.updatePageTitle("Planner");
  },
};
</script>

<style></style>
