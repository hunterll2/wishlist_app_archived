<template>
  <v-container>
    <!-- back button -->
    <wishlist-page-top-bar
      v-if="opendWishlist"
      :title="opendWishlist.name"
      @return="opendWishlist = false"
      @edit="openSheetPanel('wishlist', opendWishlist, 'edit')"
      @delete="openSheetPanel('wishlist', opendWishlist, 'delete')"
    />

    <!-- wishlist list -->
    <v-row v-if="!opendWishlist" class="flex-column">
      <v-col v-for="wishlist in all_wishlist" :key="wishlist.id">
        <wishlist-card-wishlist
          :name="wishlist.name"
          :total-items="wishlist.total_items"
          :total-cost="wishlist.total_cost"
          :priority="wishlist.priority"
          :progress="wishlist.progress"
          @click.native="open(wishlist)"
          v-touch="{
            left: () => openSheetPanel('wishlist', wishlist, 'delete'),
            right: () => openSheetPanel('wishlist', wishlist, 'edit'),
          }"
        />
      </v-col>
    </v-row>

    <!-- opend wishlist items -->
    <v-row v-else class="flex-column">
      <v-col v-for="item in items" :key="item.id">
        <wishlist-card-item
          :id="item.id"
          :name="item.name"
          :cost="item.cost"
          :priority="item.priority"
          :done="item.done"
          :subitems="getSubitems(item.id)"
          @edit-item="openSheetPanel('item', item, 'edit')"
          @delete-item="openSheetPanel('item', item, 'delete')"
          @change-status="changeStatus(item)"
          @add-subitem="addSubitem"
          @edit-subitem="editSubitem"
          @delete-subitem="deleteSubitem"
          @change-subitem-status="changeSubitemStatus"
        />
      </v-col>
    </v-row>

    <!-- action buttons -->
    <wishlist-page-action-button
      @add-action="openSheetPanel(opendWishlist ? 'item' : 'wishlist')"
    />

    <!-- sheet paneld -->
    <v-bottom-sheet v-model="sheetPanel.open" hide-overlay>
      <component
        :is="'WishlistPageSheetPanel'"
        :type="sheetPanel.type"
        :payload="sheetPanel.payload"
        :operation="sheetPanel.operation"
        @close="closeSheetPanel()"
        @close-wishlist="opendWishlist = null"
      />
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",

  components: {
    WishlistPageTopBar: () => import("@/components/WishlistPageTopBar.vue"),
    WishlistPageActionButton: () =>
      import("@/components/WishlistPageActionButton.vue"),
    WishlistPageSheetPanel: () =>
      import("@/components/WishlistPageSheetPanel.vue"),

    WishlistCardWishlist: () => import("@/components/WishlistCardWishlist.vue"),
    WishlistCardItem: () => import("@/components/WishlistCardItem.vue"),
  },

  data() {
    return {
      opendWishlist: null,
      items: [],
      sheetPanel: {
        open: false,
        type: "wishlist",
        payload: {},
        operation: "add",
      },
    };
  },

  created() {
    this.updatePageTitle("Home");
    this.fetchAllUserWishlist({
      userId: this.getAuthUser.uid,
    });
  },

  computed: {
    ...mapState("db", ["all_wishlist"]),
    ...mapGetters("auth", ["getAuthUser"]),
    ...mapGetters("db", ["getWishlistItems", "getSubitems"]),
  },

  methods: {
    ...mapActions(["updatePageTitle"]),
    ...mapActions("db", ["fetchAllUserWishlist", "fetchWishlistItems"]),

    open(wishlist) {
      this.opendWishlist = wishlist;
      this.fetchWishlistItems({
        wishlistId: wishlist.id,
      }).then(() => {
        this.items = this.getWishlistItems(wishlist.id);
      });
    },

    openSheetPanel(
      type /* wishlist or item */,
      payload = {},
      operation = "add" /* add, edit, or delete */
    ) {
      this.sheetPanel.open = true;
      this.sheetPanel.type = type;

      this.sheetPanel.payload = {
        uid: this.getAuthUser.uid,
        wishlist: this.opendWishlist ? this.opendWishlist.id : undefined,
        parentItem: payload.parentItem,
        ...payload,
      };

      this.sheetPanel.operation = operation;
    },

    closeSheetPanel() {
      this.sheetPanel.open = false;
      this.sheetPanel.payload = {};
      this.sheetPanel.type = "wishlist";
      this.sheetPanel.operation = "add";
    },

    changeStatus(item) {
      this.$store.dispatch("db/changeItemStatus", {
        parentWishlist: this.opendWishlist.id,
        item,
      });
    },
    addSubitem(payload) {
      this.openSheetPanel("item", payload, "add");
      console.log(payload);
    },
    editSubitem(payload) {
      this.openSheetPanel("item", payload, "edit");
    },
    deleteSubitem(payload) {
      this.openSheetPanel("item", payload, "delete");
    },
    changeSubitemStatus(payload) {
      this.$store.dispatch("db/changeItemStatus", {
        parentWishlist: this.opendWishlist.id,
        parentItem: payload.parentItem,
        item: {
          ...payload,
        },
      });
    },
  },
};
</script>
