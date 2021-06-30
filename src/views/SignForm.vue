<template>
  <v-container>
    <v-row justify="center" class="mt-3">
      <v-col cols="auto">
        <v-btn-toggle v-model="mode" color="primary" dense>
          <app-button value="login" label="Login" icon="login" size="large" />
          <app-button
            value="register"
            label="Register"
            icon="account-plus-outline"
            size="large"
          />
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <sign-form-login v-if="mode == 'login'" :provided-email="email" />
        <sign-form-register
          v-if="mode == 'register'"
          @registered="registered"
        />
        <sign-form-reset-password v-if="mode == 'reset'" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <app-button
          v-if="mode == 'login'"
          label="Reset password"
          icon="account-lock"
          size="large"
          @click="mode = 'reset'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignFormLogin from "@/components/SignFormLogin";
import SignFormRegister from "@/components/SignFormRegister";
import SignFormResetPassword from "@/components/SignFormResetPassword";

import { mapActions } from "vuex";

export default {
  components: { SignFormLogin, SignFormRegister, SignFormResetPassword },
  data: () => ({
    mode: "login",
    email: "",
  }),
  methods: {
    registered(data) {
      this.mode = "login";
      this.email = data.email;
    },
    ...mapActions(["updatePageTitle"]),
  },
  created() {
    this.updatePageTitle("Sign Form");
  },
};
</script>
