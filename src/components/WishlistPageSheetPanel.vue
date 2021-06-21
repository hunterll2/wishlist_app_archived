<template>
  <v-sheet>
    <template v-if="operation === 'delete'">
      <v-container>
        <v-row>
          <v-col> Are you sure about deleteing {{ payload.name }}? </v-col>
        </v-row>
        <v-row no-gutters class="pt-6">
          <v-col>
            <v-btn @click="$emit('close')" text> No, Cancel. </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="deleteOperation()" text color="error">
              Yes! delete it.
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-if="operation === 'add'">
      <component
        v-if="type === 'wishlist'"
        :is="'WishlistFormWishlist'"
        form-title="New Wishlist"
        @submited="addOperation"
        @cancel="$emit('close')"
      />
      <component
        v-else
        :is="'WishlistFormItem'"
        form-title="New Item"
        @submited="addOperation"
        @cancel="$emit('close')"
      />
    </template>

    <template v-if="operation === 'edit'">
      <component
        v-if="type === 'wishlist'"
        :is="'WishlistFormWishlist'"
        form-title="Edit Wishlist"
        :name="payload.name"
        :priority="payload.priority"
        :due_date="payload.due_date"
        @submited="updateOperation"
        @cancel="$emit('close')"
        :key="payload.name"
      />
      <component
        v-else
        :is="'WishlistFormItem'"
        form-title="Edit Item"
        :name="payload.name"
        :cost="payload.cost"
        :priority="payload.priority"
        @submited="updateOperation"
        @cancel="$emit('close')"
        :key="payload.name"
      />
    </template>
  </v-sheet>
</template>

<script>
export default {
  components: {
    WishlistFormWishlist: () => import("@/components/WishlistFormWishlist.vue"),
    WishlistFormItem: () => import("@/components/WishlistFormItem.vue"),
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    payload: {
      type: Object,
      required: true,
    },
    operation: {
      type: String,
      required: true,
    },
  },
  methods: {
    addOperation(payload) {
      if (this.type === "wishlist") {
        this.$store.dispatch("db/addNewWishlist", {
          name: payload.name,
          priority: payload.priority,
          due_date: payload.due_date,
          userId: this.payload.uid,
        });
      } else {
        this.$store.dispatch("db/addNewItem", {
          wishlistId: this.payload.wishlist,
          parentId: this.payload.parentItem,
          name: payload.name,
          cost: payload.cost,
          priority: payload.priority,
        });
      }
    },
    updateOperation(payload) {
      if (this.type === "wishlist") {
        this.$store.dispatch("db/updateWishlist", {
          id: this.payload.id,
          name: payload.name,
          priority: payload.priority,
          due_date: payload.due_date,
        });
      } else {
        this.$store.dispatch("db/updateItem", {
          id: this.payload.id,
          wishlistId: this.payload.wishlist,
          parentId: this.payload.parentItem,
          name: payload.name,
          cost: payload.cost,
          priority: payload.priority,
        });
      }

      this.$emit("close");
    },
    deleteOperation() {
      if (this.type === "wishlist") {
        this.$store
          .dispatch("db/deleteWishlist", {
            id: this.payload.id,
          })
          .then(() => {
            this.$emit("close-wishlist");
          });
      } else {
        this.$store.dispatch("db/deleteItem", {
          id: this.payload.id,
          wishlistId: this.payload.wishlist,
          parentId: this.payload.parentItem,
        });
      }

      this.$emit("close");
    },
  },
};
</script>
