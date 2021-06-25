<template>
  <div>
    <app-button
      v-for="method in methods"
      :key="method.name"
      :icon="method.icon()"
      :color="activeMethod == method.name ? 'primary' : undefined"
      class="ml-1"
      @click="changeActiveSortMethod(method)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMethod: "alphabetical",
      methods: [
        {
          name: "alphabetical",
          ascending: true,
          icon: function () {
            return `sort-${this.name}-${
              this.ascending ? "ascending" : "descending"
            }-variant`;
          },
        },
        {
          name: "numeric",
          ascending: true,
          icon: function () {
            return `sort-${this.name}-${
              this.ascending ? "ascending" : "descending"
            }-variant`;
          },
        },
        {
          name: "bool",
          ascending: true,
          icon: function () {
            return `sort-${this.name}-${
              this.ascending ? "descending" : "ascending"
            }-variant`;
          },
        },
        {
          name: "calendar",
          ascending: true,
          icon: function () {
            return `sort-${this.name}-${
              this.ascending ? "descending" : "ascending"
            }`;
          },
        },
      ],
    };
  },
  methods: {
    changeActiveSortMethod(method) {
      method.ascending = !method.ascending;
      this.activeMethod = method.name;
      this.methods.forEach((m) => {
        if (m.name != method.name) m.ascending = true;
      });
    },
  },
};
</script>
