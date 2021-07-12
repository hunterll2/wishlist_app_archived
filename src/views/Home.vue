<template>
  <v-container id="home" class="pa-0">
    <v-app-bar
      dense
      hide-on-scroll
      elevate-on-scroll
      app
      color="white"
      class="text-body-2"
    >
      <v-toolbar-title @click="close()">
        <v-icon left v-if="depth > 1 && !edit">
          mdi-arrow-left-thin-circle-outline
        </v-icon>
        {{ getCurrentOpendName }}
      </v-toolbar-title>

      <v-spacer />

      <app-button
        v-if="!edit"
        label="Edit"
        color="primary"
        @click="edit = true"
      />
      <app-button v-else label="Done" color="success" @click="done" />

      <template #extension>
        <template v-if="!edit">
          <app-progress-circle
            :percentage="getCurrentOpendProgress"
            :label="getCurrentOpendProgressString"
          />
          <v-spacer />
          <wishlist-page-sort
            :sort-methods="getSortMethods"
            @sort-method-changed="changeSortMethod"
          />
        </template>

        <wishlist-page-form
          v-else
          :type="depth >= 2 ? 'item' : 'wishlist'"
          @add-item="operation('add', $event)"
        />
      </template>
    </v-app-bar>

    <v-progress-linear v-if="loading" indeterminate fixed />

    <wishlist-items
      v-if="!edit"
      :items="items"
      @open-item="open"
      @change-status="operation('change_status', $event)"
    />
    <wishlist-items-edit
      v-else
      :items="items"
      @update-item="operation('update', $event)"
      @delete-item="operation('delete', $event)"
    />

    <div v-if="!edit" class="center-floating-button">
      <app-button
        :icon="`arrow-up-drop-circle-outline`"
        type="button-icon"
        icon-size="small"
        color="white"
        @click="showDetails = true"
      />
    </div>

    <v-bottom-sheet v-model="showDetails">
      <v-card tile>
        <v-card-title></v-card-title>
        <v-card-text class="text-caption">
          <app-simple-table :items="costStats" />
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",

  components: {
    WishlistItems: () => import("@/components/WishlistItems"),
    WishlistItemsEdit: () => import("@/components/WishlistItemsEdit"),
    WishlistPageSort: () => import("@/components/WishlistPageSort"),
    WishlistPageForm: () => import("@/components/WishlistPageForm"),
  },

  data() {
    return {
      opendStack: [],
      edit: false,
      showDetails: false,
      loading: false,
      sort: "alphabetical",
      ascending: true,
    };
  },

  created() {
    this.$store
      .dispatch("db/initUserWishlistsObject", {
        userId: this.getAuthUser.uid,
      })
      .then(() => {
        this.opendStack.push(this.user_wishlists);

        this.loading = true;

        this.$store
          .dispatch("db/init", {
            userId: this.getAuthUser.uid,
          })
          .then(() => {
            this.loading = false;
          });
      });
  },

  computed: {
    ...mapState("db", ["user_wishlists"]),
    ...mapGetters("auth", ["getAuthUser"]),

    // getters
    depth() {
      return this.opendStack.length;
    },
    currentItem() {
      return this.opendStack[this.opendStack.length - 1];
    },
    items() {
      return this.currentItem ? this.currentItem.items : [];
    },
    getCurrentOpendName() {
      return this.currentItem ? this.currentItem.name : undefined;
    },
    getCurrentOpendProgress() {
      return this.currentItem ? this.currentItem.done : 0;
    },
    getCurrentOpendProgressString() {
      return this.currentItem ? this.currentItem.getProgressString : "0 of 0";
    },

    // sort
    getSortMethods() {
      if (this.depth > 0) return ["alph", "numeric", "bool"];
      else return ["alph", "numeric", "bool", "date"];
    },

    costStats() {
      const stats = [
        {
          label: "Total Cost:",
          icon: "cash",
          value: this.currentItem
            ? this.currentItem.total_cost + " SAR"
            : "0 SAR",
        },
        {
          label: "Total Spent:",
          icon: "cash-minus",
          value: this.currentItem
            ? this.currentItem.total_spent + " SAR"
            : "0 SAR",
        },
        {
          label: "Total Remaining:",
          icon: "cash-check",
          value: this.currentItem
            ? this.currentItem.remaining + " SAR"
            : "0 SAR",
        },
      ];

      return stats;
    },
  },

  methods: {
    // sort
    changeSortMethod(newMethod) {
      this.sort = newMethod.name;
      this.ascending = newMethod.ascending;
      this.doSort();
    },
    doSort() {
      let field = "name";
      if (this.sort == "numeric")
        field = this.depth > 0 ? "cost" : "total_cost";
      else if (this.sort == "bool")
        field = this.depth > 0 ? "done" : "total_cost";

      this.items.sort((first, second) => {
        const condition = this.ascending
          ? first[field] < second[field]
          : first[field] > second[field];

        if (condition) return -1;
        else return 1;
      });
    },

    // items methods
    open(item) {
      if (this.depth >= 1 && this.depth <= 2) this.opendStack.push(item);
    },

    close() {
      if (this.depth > 1) this.opendStack.pop();
    },

    operation(type, payload) {
      this.loading = true;
      const wishlist = this.opendStack[1],
        item = this.opendStack[2];

      const obj = {
        wishlistId: wishlist ? wishlist.id : undefined,
        parentId: item ? item.id : undefined,
        itemId: payload.id,
        item: {
          name: payload.name,
          priority: "normal",
          cost: Number(payload.cost),
          done: !isNaN(payload.done) ? payload.done : undefined,
          due_date: "",
          user: this.getAuthUser.uid,
        },
      };

      this.$store
        .dispatch(`db/operation`, {
          type,
          ...obj,
        })
        .then(() => (this.loading = false));
    },

    done() {
      this.edit = false;
    },
  },
};
</script>

<style lang="scss">
#home {
  .v-input {
    font-size: inherit;

    .v-label {
      font-size: inherit;
    }
  }

  .center-floating-button {
    position: fixed;
    bottom: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
