<template>
  <div>
    <app-button
      v-for="method in methods"
      :key="method.name"
      :icon="method.icon()"
      :size="small ? 'x-small' : 'small'"
      :color="activeMethod == method.name ? 'primary' : undefined"
      class="ml-1"
      @click="changeActiveSortMethod(method)"
    />
  </div>
</template>

<script>
export default {
  props: {
    sortMethods: {
      type: Array,
      default: () => ["alph", "numeric", "bool", "date"],
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    sortMethods() {
      this.methods = [];
      this.setMethods();
    },
  },
  created() {
    this.setMethods();
  },
  data() {
    return {
      activeMethod: "alphabetical",
      methods: [],
    };
  },
  methods: {
    changeActiveSortMethod(method) {
      method.ascending = !method.ascending;
      this.activeMethod = method.name;
      this.methods.forEach((m) => {
        if (m.name != method.name) m.ascending = true;
      });

      this.$emit("sort-method-changed", method);
    },
    setMethods() {
      this.sortMethods.forEach((method) => {
        if (method == "alph") {
          this.methods.push({
            name: "alphabetical",
            ascending: true,
            icon: function () {
              return `sort-${this.name}-${
                this.ascending ? "ascending" : "descending"
              }-variant`;
            },
          });
        } else if (method == "numeric") {
          this.methods.push({
            name: "numeric",
            ascending: true,
            icon: function () {
              return `sort-${this.name}-${
                this.ascending ? "ascending" : "descending"
              }-variant`;
            },
          });
        } else if (method == "bool") {
          this.methods.push({
            name: "bool",
            ascending: true,
            icon: function () {
              return `sort-${this.name}-${
                this.ascending ? "descending" : "ascending"
              }-variant`;
            },
          });
        } else if (method == "date") {
          this.methods.push({
            name: "calendar",
            ascending: true,
            icon: function () {
              return `sort-${this.name}-${
                this.ascending ? "descending" : "ascending"
              }`;
            },
          });
        }
      });
    },
  },
};
</script>
