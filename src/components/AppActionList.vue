<template>
  <v-card>
    <v-list>
      <template v-for="item in items">
        <v-list-item :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              <v-row no-gutters>
                <v-col cols="7" class="mr-2">
                  <v-text-field dense hide-details filled :value="item.name" />
                </v-col>
                <v-col>
                  <v-text-field
                    dense
                    hide-details
                    filled
                    flat
                    :value="item.amount"
                  />
                </v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="`${item.id}-divider`" />
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
