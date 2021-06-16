<template>
  <v-form v-model="valid" @submit.prevent="save">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="curPassword"
            type="password"
            label="Current Password"
            required
          />
          <v-text-field
            v-model="newPassword"
            :rules="passwordRules"
            type="password"
            label="New Password"
            required
          />
        </v-col>
      </v-row>

      <v-row justify="space-between">
        <v-col>
          <v-btn color="error" @click="$emit('cancel')">Cancel</v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn color="primary" type="submit"> Save </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    curPassword: "",
    newPassword: "",
    passwordRules: [(v) => !!v || "please enter valid password"],
  }),
  methods: {
    save() {
      this.$emit("save", {
        curPassword: this.curPassword,
        newPassword: this.newPassword,
      });
    },
  },
};
</script>
