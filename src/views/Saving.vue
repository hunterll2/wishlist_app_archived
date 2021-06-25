<template>
  <v-container>
    <v-row v-if="loading" justify="center">
      <v-col cols="2">
        <v-fade-transition>
          <v-progress-circular indeterminate />
        </v-fade-transition>
      </v-col>
    </v-row>
    <v-fade-transition v-else>
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
    this.$store.dispatch("updatePageTitle", "Saving");
    this.loading = true;
    this.$store
      .dispatch("user/fetchUserSavingData", this.getAuthUser.uid)
      .then((areTheUserHaveSavingData) => {
        this.firstTime = !areTheUserHaveSavingData;
        this.loading = false;
      });
  },
};
</script>

<style></style>
