<template>
  <v-form v-model="valid" @submit.prevent="reset">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="[(v) => !!v]"
            label="Email"
            required
            hide-details
          />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-6">
        <v-col cols="auto">
          <v-btn type="submit" color="primary" :disabled="!valid">
            Reset Password
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert type="error" dense>
            The provided email isn't registerd.
          </v-alert>
          <v-alert type="info" dense>
            Check your email for the reset password code.
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
    };
  },
  methods: {
    reset() {},
  },
};
</script>
