<template>
  <v-toolbar dense flat>
    <v-toolbar-title @click="$emit('back')">
      <v-fade-transition>
        <app-button
          v-if="backButton"
          size="large"
          icon="arrow-left-thin-circle-outline"
          :label="backButton"
          @click.native.stop="$emit('back')"
        />
      </v-fade-transition>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <app-button
      v-if="!mode.edit"
      label="Edit"
      color="primary"
      @click="enterEditMode"
    />
    <app-button v-else label="Close" color="error" @click="existEditMode" />
  </v-toolbar>
</template>

<script>
export default {
  props: {
    backButton: {
      type: String,
    },
  },
  data() {
    return {
      mode: {
        edit: false,
      },
    };
  },
  methods: {
    enterEditMode() {
      this.mode.edit = true;
      this.$emit("edit");
    },
    existEditMode() {
      this.mode.edit = false;
      this.$emit("view");
    },
  },
};
</script>
