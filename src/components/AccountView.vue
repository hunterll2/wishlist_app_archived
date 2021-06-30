<template>
  <v-container>
    <v-row align="center" class="text-body-1">
      <v-col>
        <v-text-field :value="user.email" disabled hide-details dense />
      </v-col>
    </v-row>

    <v-row>
      <app-button label="Log out" @click="$emit('log-out')" />
      <app-button label="Change Password" @click="$emit('change-password')" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignForm",
  props: {
    user: {
      type: Object,
      require: true,
    },
  },
};
</script>
