<template>
  <v-container>
    <v-expand-transition>
      <saving-stats v-if="mode.stats" />
    </v-expand-transition>

    <div class="center-floating-button">
      <app-button
        :icon="`arrow-${mode.stats ? 'down' : 'up'}-drop-circle-outline`"
        type="button-icon"
        icon-size="small"
        color="white"
        @click="changeMode"
      />
    </div>

    <v-expand-transition>
      <saving-data v-if="mode.data" />
    </v-expand-transition>
  </v-container>
</template>

<script>
export default {
  components: {
    SavingStats: () => import("./SavingStats.vue"),
    SavingData: () => import("./SavingData.vue"),
  },
  data() {
    return {
      mode: {
        stats: true,
        data: false,
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    changeMode() {
      this.mode.stats = !this.mode.stats;
      this.mode.data = !this.mode.data;
    },
  },
};
</script>

<style lang="scss">
.center-floating-button {
  position: fixed;
  bottom: 70px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
