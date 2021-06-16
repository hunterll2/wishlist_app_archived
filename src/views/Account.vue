<template>
  <v-container>
    <account-view
      v-if="mode === 'view'"
      :user="user"
      @change-password="mode = 'edit'"
      @log-out="logOut"
    />
    <account-change-password
      v-else-if="mode === 'edit'"
      @cancel="mode = 'view'"
      @save="updatePassword"
    />
    <v-alert v-if="error" type="error">
      {{ error.message }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import AccountView from "@/components/AccountView.vue";
import AccountChangePassword from "@/components/AccountChangePassword.vue";

export default {
  components: { AccountView, AccountChangePassword },

  data: () => ({
    mode: "view",
    user: {},
    error: null,
  }),

  created() {
    this.fetchAuthUser().then((u) => (this.user = u));
    this.updatePageTitle("Account");
  },

  methods: {
    updatePassword(data) {
      this.$store
        .dispatch("user/updateUserPassword", {
          email: this.user.email,
          curPassword: data.curPassword,
          newPassword: data.newPassword,
        })
        .then(() => (this.mode = "view"))
        .catch((e) => {
          this.error = e;
        });
    },
    logOut() {
      this.signOut().then(() => this.$router.push("/sign"));
    },
    ...mapActions(["updatePageTitle"]),
    ...mapActions("auth", ["fetchAuthUser", "signOut"]),
  },
};
</script>
