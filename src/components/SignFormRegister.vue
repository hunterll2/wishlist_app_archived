<template>
  <v-form v-model="valid" @submit.prevent="register">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
            hide-details
            @focus="error = null"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
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
          <v-btn type="submit" color="success" :disabled="!valid">
            Register
          </v-btn>
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
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [(v) => !!v || "please enter valid email"],
      passwordRules: [(v) => !!v || "please enter valid password"],
      error: null,
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("auth/registerUserWithEmailAndPassword", {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$emit("registered", { email: this.email }))
        .catch((e) => (this.error = e));
    },
  },
};
</script>
