<template>
  <v-container>
    <v-fade-transition>
      <v-progress-circular
        v-if="loading"
        class="center-floating"
        indeterminate
      />
    </v-fade-transition>
    <v-fade-transition v-if="!loading">
      <component :is="curComponent" @go="startEnterData = true" />
    </v-fade-transition>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Saving",
  components: {
    SavingView: () => import("@/components/SavingView.vue"),
    SavingGetStarted: () => import("@/components/SavingGetStarted.vue"),
    SavingEnterData: () => import("@/components/SavingEnterData.vue"),
  },
  data() {
    return {
      loading: false,
      firstTime: true,
      startEnterData: false,
    };
  },
  computed: {
    curComponent() {
      if (this.startEnterData) return "SavingEnterData";
      else if (this.firstTime) return "SavingGetStarted";
      else return "SavingView";
    },
    ...mapGetters("auth", ["getAuthUser"]),
  },
  methods: {},
  created() {
    this.loading = true;
    this.$store
      .dispatch("user/fetchUserSavingData", this.getAuthUser.uid)
      .then((areTheUserHasSavingData) => {
        this.firstTime = !areTheUserHasSavingData;
        this.loading = false;
      });
  },
};
</script>

<style>
.center-floating {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
