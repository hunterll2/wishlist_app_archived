<template>
  <v-form ref="form" v-model="valid" @submit.prevent="login">
    <v-container>
      <v-row class="flex-column">
        <v-col>
          <v-text-field
            v-model="email"
            :rules="[(v) => !!v]"
            label="Email"
            required
            hide-details
            @focus="error = null"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="password"
            :rules="[(v) => !!v]"
            label="Password"
            type="password"
            required
            hide-details
            @focus="error = null"
          />
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-6">
        <v-col cols="auto">
          <v-btn type="submit" color="success" :disabled="!valid">Log In</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-alert v-if="error" type="error" dense>
            {{ error.message }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    providedEmail: {
      type: String,
    },
  },
  created() {
    if (this.providedEmail) this.email = this.providedEmail || "";
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      this.signInWithEmailAndPassword({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((r) => (this.error = r));
    },
    ...mapActions("auth", ["signInWithEmailAndPassword"]),
  },
};
</script>

<style></style>
