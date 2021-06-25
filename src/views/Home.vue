<template>
  <v-container>
    <v-toolbar rounded>
      <v-toolbar-title @click="opendWishlist = null">
        <!-- <v-icon v-if="opendWishlist">
          mdi-arrow-left-thin-circle-outline
        </v-icon> -->
        <v-fab-transition>
          <app-button
            v-if="opendWishlist"
            icon="arrow-left-thin-circle-outline"
          />
        </v-fab-transition>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <app-button label="Info" @click="infoSheet = true" />

      <app-button label="Edit" @click="editSheet = true" color="primary" />

      <template #extension>
        <v-progress-circular value="50" size="16" width="2" color="primary" />
        <div class="text--secondary text-body-2 ml-2">3 of 5 done</div>
        <v-spacer />
        <wishlist-page-sort />
      </template>
    </v-toolbar>

    <v-card class="mt-6">
      <v-card-text v-if="!opendWishlist" class="pa-0">
        <template v-for="(item, i) in all_wishlist">
          <app-action-list-item
            :key="item.id"
            :action="item.progress + 100 + '%'"
            :action-text="`0 of ${item.total_items}`"
            :done="item.done"
            :name="item.name"
            :subtitle="computedCost(item.total_cost) + ' SAR'"
            @click.native="open(item)"
          />
          <v-divider v-if="i + 1 < all_wishlist.length" :key="'divider-' + i" />
        </template>
      </v-card-text>

      <v-card-text v-else class="pa-0">
        <template v-for="(item, i) in items">
          <app-action-list-item
            :key="item.id"
            :name="item.name"
            :subtitle="computedCost(item.cost) + ' SAR'"
            :done="item.done"
          >
            <template #action>
              <app-button
                :icon="`checkbox-${
                  item.done ? 'marked' : 'blank'
                }-circle-outline`"
                @click="changeStatus(item)"
              />
            </template>
          </app-action-list-item>

          <v-divider v-if="i + 1 < items.length" :key="'divider-' + i" />
        </template>
      </v-card-text>
    </v-card>

    <v-bottom-sheet v-model="infoSheet">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>Total Cost:</v-col>
            <v-col class="text-right">8,400 SAR</v-col>
          </v-row>
          <v-divider class="my-1" />
          <v-row>
            <v-col>Total Spent:</v-col>
            <v-col class="text-right">4,400 SAR</v-col>
          </v-row>
          <v-divider class="my-1" />
          <v-row>
            <v-col>Remaing Cost:</v-col>
            <v-col class="text-right">4,000 SAR</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="editSheet">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <app-text-field label="Name" value="Office" shape="box" />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" class="mt-4">
            <v-col cols="5" class="text-body-1">Priority</v-col>
            <v-col>
              <v-btn-toggle mandatory dense>
                <app-button label="Low" />
                <app-button label="Normal" />
                <app-button label="high" />
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row no-gutters align="center" class="mt-4">
            <v-col cols="5">
              <v-checkbox label="Due Date" dense hide-details />
            </v-col>
            <v-col>
              <v-select
                :items="[2021, 2022, 2023]"
                label="Year"
                hide-details
                dense
              />
            </v-col>
            <v-col>
              <v-select
                :items="[1, 2, 3, 4, 5, 6]"
                label="Month"
                hide-details
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="addSheet">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <app-text-field label="Name" shape="box" />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" class="mt-4">
            <v-col cols="5" class="text-body-1">Priority</v-col>
            <v-col>
              <v-btn-toggle mandatory dense>
                <app-button label="Low" />
                <app-button label="Normal" />
                <app-button label="high" />
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",

  components: {
    WishlistPageSort: () => import("@/components/WishlistPageSort"),
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
      infoSheet: false,
      editSheet: false,
      addSheet: false,
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
    getSortMethodIcon(methodName, methodType) {
      let icon = `sort-${methodName}`;
      icon += "-" + methodType;
      icon += `${methodName != "calendar" ? "-variant" : ""}`;
      return icon;
    },
    changeSortMethodType() {
      if (this.sort.selected_method <= 2) this.sort.selected_method += 1;
      else this.sort.selected_method = 0;
    },
    computedCost(cost) {
      let costArray = cost.toString().split("");
      // let costLength = costArray.length;

      if (costArray.length === 4) costArray.splice(1, 0, ",");
      else if (costArray.length === 5) costArray.splice(2, 0, ",");
      else if (costArray.length === 6) costArray.splice(3, 0, ",");

      return costArray.join("");
    },

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
