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
      <v-toolbar-title v-if="getCurrentOpendName && !edit" @click="close()">
        <v-icon left> mdi-arrow-left-thin-circle-outline </v-icon>
        {{ getCurrentOpendName }}
      </v-toolbar-title>

      <v-spacer />

      <app-button
        v-if="!edit"
        label="Edit"
        color="primary"
        @click="edit = true"
      />
      <app-button v-else label="Done" color="success" @click="edit = false" />

      <template #extension>
        <template v-if="!edit">
          <app-progress-circle
            :percentage="completionPercentage"
            :label="`${totalDone} of ${items.length} done`"
          />
          <v-spacer />
          <wishlist-page-sort
            :sort-methods="getSortMethods"
            @sort-method-changed="changeSortMethod"
          />
        </template>

        <wishlist-page-form
          v-else
          :type="depth > 0 ? 'item' : 'wishlist'"
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

    <!-- <v-card :loading="loading">
      <v-card-text class="pa-0"></v-card-text>
      <div v-if="!edit" class="center-floating-button">
        <app-button
          :icon="`arrow-${showDetails ? 'down' : 'up'}-drop-circle-outline`"
          type="button-icon"
          icon-size="small"
          color="white"
          @click="showDetails = !showDetails"
        />
      </div>

      <v-divider />

      <v-card-actions v-if="showDetails" class="text-caption d-block">
        <app-simple-table :items="costStats" />
      </v-card-actions>
    </v-card> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",

  components: {
    // WishlistTopBar: () => import("@/components/WishlistTopBar"),
    WishlistItems: () => import("@/components/WishlistItems"),
    WishlistItemsEdit: () => import("@/components/WishlistItemsEdit"),
    WishlistPageSort: () => import("@/components/WishlistPageSort"),
    WishlistPageForm: () => import("@/components/WishlistPageForm"),
  },

  data() {
    return {
      opendStack: [],
      items: [],
      edit: false,
      showDetails: false,
      loading: false,
      sort: "alphabetical",
      ascending: true,
    };
  },

  created() {
    this.loading = true;

    this.fetchAllUserWishlist({
      userId: this.getAuthUser.uid,
    }).then(() => {
      // set user all wishlist as current showing items
      this.items = this.all_wishlist;
      this.loading = false;
      this.doSort();
    });
  },

  mounted() {
    // console.log(this.);
  },

  computed: {
    ...mapState("db", ["all_wishlist"]),
    ...mapGetters("auth", ["getAuthUser"]),
    ...mapGetters("db", ["getWishlistItems", "getSubitems"]),

    // getters
    getSuitableHeight() {
      return this.$vuetify.breakpoint.height;
    },
    depth() {
      return this.opendStack.length;
    },
    currentWishlist() {
      return this.opendStack[0];
    },
    currentItem() {
      return this.opendStack[1];
    },
    getSortMethods() {
      if (this.depth > 0) return ["alph", "numeric", "bool"];
      else return ["alph", "numeric", "bool", "date"];
    },
    getCurrentOpendName() {
      const item = this.opendStack[this.opendStack.length - 1];
      return item ? item.name : undefined;
    },

    // calculations (done/undone)
    totalDoneItems() {
      let dones = 0;

      this.items.forEach((item) => {
        if (item.done) dones += 1;
      });

      return dones;
    },
    totalDoneWishlist() {
      let done = 0;

      this.all_wishlist.forEach((wishlist) => {
        if (
          wishlist.total_items != 0 &&
          wishlist.total_items === wishlist.total_done
        )
          done += 1;
      });

      return done;
    },
    totalDone() {
      if (this.depth == 0) return this.totalDoneWishlist;
      else return this.totalDoneItems;
    },
    completionPercentage() {
      if (this.depth == 0)
        return (this.totalDoneWishlist / this.all_wishlist.length) * 100;
      else return (this.totalDoneItems / this.items.length) * 100;
    },

    // calculations (cost)
    totalCost() {
      let total = 0;
      this.items.forEach((item) => {
        total += item.cost ? item.cost : item.total_cost;
      });

      return total;
    },
    totalSpent() {
      let total = 0;
      this.items.forEach((item) => {
        if (item.done) total += item.cost;
      });

      return total;
    },
    totalRemaining() {
      return this.computedCost(this.totalCost - this.totalSpent);
    },
    costStats() {
      const stats = [
        {
          label: "Total Cost:",
          icon: "cash",
          value: this.computedCost(this.totalCost) + " SAR",
        },
        {
          label: "Total Spent:",
          icon: "cash-minus",
          value: this.computedCost(this.totalSpent) + " SAR",
        },
        {
          label: "Total Remaining:",
          icon: "cash-check",
          value: this.totalRemaining + " SAR",
        },
      ];

      return stats;
    },
  },

  methods: {
    ...mapActions("db", ["fetchAllUserWishlist", "fetchWishlistItems"]),

    computedCost(cost) {
      let costArray = cost.toString().split("");
      // let costLength = costArray.length;

      if (costArray.length === 4) costArray.splice(1, 0, ",");
      else if (costArray.length === 5) costArray.splice(2, 0, ",");
      else if (costArray.length === 6) costArray.splice(3, 0, ",");

      return costArray.join("");
    },

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
      if (this.depth >= 0 && this.depth <= 1) this.opendStack.push(item);
      else return;

      if (this.depth == 1) {
        this.loading = true;

        this.fetchWishlistItems({
          wishlistId: this.currentWishlist.id,
        }).then(() => {
          this.items = this.getWishlistItems(this.currentWishlist.id);
          this.loading = false;
        });
      } else if (this.depth == 2) {
        this.items = this.getSubitems(this.currentItem.id);
      }
    },
    close() {
      this.opendStack.pop();

      if (this.depth == 1)
        this.items = this.getWishlistItems(this.currentWishlist.id);
      else if (this.depth == 0) this.items = this.all_wishlist;
    },

    operation(type, payload) {
      this.loading = true;

      const obj = {
        wishlistId: this.depth > 0 ? this.currentWishlist.id : undefined,
        parentWishlist: this.depth > 0 ? this.currentWishlist.id : undefined,
        parentItem: this.depth > 1 ? this.currentItem.id : undefined,
        id: payload.id, // if delete
        name: payload.name,
        priority: "normal",
        cost: payload.cost, // if item
        done: payload.done, // if item
        due_date: "", // if wishlist
        userId: this.getAuthUser.uid,
      };

      let operationName;
      switch (type) {
        case "add":
          operationName = this.depth > 0 ? "addNewItem" : "addNewWishlist";
          break;
        case "update":
          operationName = this.depth > 0 ? "updateItem" : "updateWishlist";
          break;
        case "delete":
          operationName = this.depth > 0 ? "deleteItem" : "deleteWishlist";
          break;
        case "change_status":
          operationName = "changeItemStatus";
          break;
      }

      this.$store
        .dispatch(`db/${operationName}`, obj)
        .then(() => (this.loading = false));
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

  .fixed-height-container {
    overflow: auto;
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
