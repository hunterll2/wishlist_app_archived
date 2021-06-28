<template>
  <v-list-item dense>
    <v-list-item-action v-if="!!this.$slots.action" class="pa-0 ma-0">
      <slot name="action"></slot>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title>
        <v-row no-gutters v-if="cost">
          <v-col cols="7">
            <app-text-field
              v-model="localName"
              shape="flat"
              tile
              dense
              @change="sentUpdateReq"
            />
          </v-col>
          <v-col>
            <app-text-field
              v-model="localCost"
              shape="flat"
              suffix="SAR"
              @change="sentUpdateReq"
            />
          </v-col>
        </v-row>

        <app-text-field
          v-else
          v-model="localName"
          shape="flat"
          tile
          dense
          @change="sentUpdateReq"
        />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    name: String,
    subtitle: String,
    cost: [String, Number],
  },
  data() {
    return {
      controls: false,
      localName: "",
      localCost: "",
    };
  },
  created() {
    this.localName = this.name;
    this.localCost = this.cost;
  },
  methods: {
    sentUpdateReq() {
      this.$emit("update-item", {
        name: this.localName,
        cost: this.localCost,
      });
    },
  },
};
</script>

<style>
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-weight: normal !important;
}
</style>
