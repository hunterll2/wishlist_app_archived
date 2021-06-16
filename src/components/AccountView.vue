<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field :value="user.email" disabled required />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn color="error" @click="$emit('log-out')">Log out</v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="$emit('change-password')">
          Change Password
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      require: true,
    },
  },
};
</script>
