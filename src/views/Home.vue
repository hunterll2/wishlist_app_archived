<template>
  <v-container>
    <!-- back button -->
    <v-row v-if="opendWishlist">
      <v-col>
        <v-btn
          block
          depressed
          tile
          text
          class="justify-start"
          @click.native="opendWishlist = null"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          <template>{{ opendWishlist.title }}</template>
        </v-btn>
      </v-col>
    </v-row>

    <!-- current wishlist -->
    <v-row v-if="opendWishlist">
      <v-col>
        <wishlist-card
          :title="opendWishlist.title"
          :total-cost="opendWishlist.total_cost"
          :priority="opendWishlist.priority"
          :progress="opendWishlist.progress"
        />
      </v-col>
    </v-row>

    <!-- items list -->
    <v-row v-if="!opendWishlist" class="flex-column">
      <v-col v-for="wishlist in all_wishlist" :key="wishlist.id">
        <wishlist-card
          :title="wishlist.title"
          :total-cost="wishlist.total_cost"
          :priority="wishlist.priority"
          :progress="wishlist.progress"
          @click.native="open(wishlist)"
        />
      </v-col>
    </v-row>

    <v-row v-else class="flex-column">
      <v-col v-for="item in items" :key="item.id">
        <wishlist-item
          :name="item.name"
          :cost="item.cost"
          :priority="item.priority"
          :done="item.done"
          :items="item.subitems"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import WishlistCard from "@/components/WishlistCard.vue";
import WishlistItem from "@/components/WishlistItem.vue";

export default {
  name: "Home",

  components: { WishlistCard, WishlistItem },

  data() {
    return {
      opendWishlist: null,
      items: [],
    };
  },

  mounted() {
    this.updatePageTitle("Home");
    this.fetchAllUserWishlist({
      userId: this.getAuthUser.email,
    });
  },

  computed: {
    ...mapState("db", ["all_wishlist"]),
    ...mapGetters("auth", ["getAuthUser"]),
    ...mapGetters("db", ["getItemsOfParent"]),
  },

  methods: {
    ...mapActions(["updatePageTitle"]),
    ...mapActions("db", ["fetchAllUserWishlist", "fetchItemsOfParent"]),
    open(wishlist) {
      this.opendWishlist = wishlist;
      this.fetchItemsOfParent({
        parentId: wishlist.id,
      }).then(() => {
        this.items = this.getItemsOfParent(wishlist.id);
      });
    },
  },
};
</script>
