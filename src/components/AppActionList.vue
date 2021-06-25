<template>
  <v-list>
    <!-- <v-list-item
      v-for="item in items"
      :key="item.id"
      v-ripple
      class="pa-0 px-2"
      @click="$emit('open-item', item)"
    >
      <v-list-item-action>
        {{ item.progress }}
        <v-list-item-action-text>
          0 of {{ item.total_items }}
        </v-list-item-action-text>
      </v-list-item-action>

      <v-list-item-action>
        <app-button
          :icon="`checkbox-blank-circle-outline`"
          @click="$emit('change-status', item)"
        />
      </v-list-item-action>

      <v-list-item-content
        class="ma-0"
        :class="{ 'text--secondary': item.done }"
      >
        <v-list-item-title>
          <v-row no-gutters>
            <v-col>
              {{ item.name }}
            </v-col>
            <v-col class="text-right"> {{ item.cost }} SAR </v-col>
          </v-row>
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ item.priority }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item> -->
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
