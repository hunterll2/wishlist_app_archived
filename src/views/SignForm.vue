<template>
  <v-container>
    <v-row justify="center" class="mt-3">
      <v-col cols="auto">
        <v-btn-toggle v-model="mode" color="primary" tile>
          <v-btn value="login" text>
            <v-icon left>mdi-login</v-icon>
            Log In
          </v-btn>
          <v-btn value="register" text>
            <v-icon left>mdi-account-plus-outline</v-icon>
            Register
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <sign-form-login v-if="mode === 'login'" :provided-email="email" />
        <sign-form-register
          v-if="mode === 'register'"
          @registered="registered"
        />
        <sign-form-reset-password v-if="mode === 'reset'" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn v-if="mode === 'login'" text small @click="mode = 'reset'">
          Reset password
        </v-btn>
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
