import Vue from "vue";

import {
  FetchDocs,
  FetchSetOfDocs,
  AddDoc,
  UpdateDoc,
  DeleteDoc,
} from "@/helpers/firebaseHelpers";

export default {
  namespaced: true,

  state: {
    all_wishlist: [],
    /*
    [
      {
        name,
        total_cost,
        priority,
        done,
        progress,
        due_date,
        user
      }
    ]
    */
    wishlistItems: [],
    /*
    [
      {
        wishlist: wishlistId,
        items: [
          {
            id,
            name,
            cost,
            priority,
            done,
          }
        ]
      }
    ]
    */
    subitems: [],
    /*
    [
      {
        item: parentItemId,
        subitems: [
          {
            name,
            cost,
            priority,
            done,
          }
        ]
      }
    ]
    */
  },

  getters: {
    getWishlistItems: (state) => (wishlistId) =>
      state.wishlistItems.find((obj) => obj.wishlist === wishlistId).items,
    getSubitems: (state) => (itemId) => {
      const obj = state.subitems.find((obj) => obj.item === itemId);
      return obj ? obj.subitems : undefined;
    },
  },

  mutations: {
    SET_USER_WISHLIST_ARRAY(state, wishlistArray) {
      state.all_wishlist = wishlistArray;
    },
    SAVE_WISHLIST_ITEMS(state, { wishlistId, items }) {
      state.wishlistItems.push({ wishlist: wishlistId, items });
    },
    SAVE_SUBITEMS(state, { itemId, subitems }) {
      state.subitems.push({ item: itemId, subitems });
    },

    // Add, Edit, Delete
    Add_NEW_WISHLIST_INTO_STATE(state, newWishlistObj) {
      state.all_wishlist.push(newWishlistObj);
    },
    UPDATE_WISHLIST(state, wishlistObj) {
      const wishlist = state.all_wishlist.find(
        (wishlist) => wishlist.id === wishlistObj.id
      );

      wishlist.name = wishlistObj.name;
      wishlist.priority = wishlistObj.priority;
      wishlist.due_date = wishlistObj.due_date;
    },
    REMOVE_WISHLIST_FROM_STATE(state, id) {
      const wishlistIndex = state.all_wishlist.findIndex(
        (wishlist) => wishlist.id === id
      );
      Vue.delete(state.all_wishlist, wishlistIndex);
    },

    // Add, Edit, Delete item from state
    Add_NEW_ITEM_INTO_STATE(state, { wishlistId, parentId, newItemObj }) {
      const wishlist = state.wishlistItems.find(
        (obj) => obj.wishlist === wishlistId
      );
      if (parentId) {
        const parentItem = state.subitems.find((obj) => obj.item === parentId);
        parentItem.subitems.push(newItemObj);
      } else {
        wishlist.items.push(newItemObj);
      }
    },
    UPDATE_ITEM(state, { wishlistId, parentId, itemObj }) {
      // find item parent wishlist
      const wishlist = state.wishlistItems.find(
        (obj) => obj.wishlist === wishlistId
      );

      // find item object
      let item;
      if (parentId) {
        const parentItem = state.subitems.find((obj) => obj.item === parentId);
        item = parentItem.subitems.find((obj) => obj.id === itemObj.id);
      } else {
        item = wishlist.items.find((obj) => obj.id === itemObj.id);
      }

      item.name = itemObj.name;
      item.cost = itemObj.cost;
      item.priority = itemObj.priority;
    },
    REMOVE_ITEM_FROM_STATE(state, { wishlistId, parentId, id }) {
      // find item parent wishlist
      const wishlist = state.wishlistItems.find(
        (obj) => obj.wishlist === wishlistId
      );

      // find item index
      let itemIndex;
      if (parentId) {
        const parentItem = state.subitems.find((obj) => obj.item === parentId);
        itemIndex = parentItem.subitems.findIndex((obj) => obj.id === id);
        Vue.delete(parentItem.subitems, itemIndex);
      } else {
        itemIndex = wishlist.items.findIndex((obj) => obj.id === id);
        Vue.delete(wishlist.items, itemIndex);
      }
    },

    CHANGE_ITEM_STATUS(state, { parentWishlist, parentItem, item }) {
      let targetParent, targetItem;

      if (parentItem) {
        targetParent = state.subitems.find((obj) => obj.item === parentItem);
        targetItem = targetParent.subitems.find((obj) => obj.id === item.id);
        targetItem.done = !item.done;
      } else {
        targetParent = state.wishlistItems.find(
          (obj) => obj.wishlist === parentWishlist
        );
        targetItem = targetParent.items.find((obj) => obj.id === item.id);
        targetItem.done = !item.done;
      }
    },
  },

  actions: {
    async fetchAllUserWishlist({ state, commit }, { userId }) {
      // check if wishlist is already fetched or not
      if (state.all_wishlist.length > 0) return;

      //
      const userWishlistArray = await FetchSetOfDocs(
        "wishlist",
        `user == ${userId}`
      );

      commit("SET_USER_WISHLIST_ARRAY", userWishlistArray);
    },

    async fetchWishlistItems({ state, commit }, { wishlistId }) {
      // 0. check if wishlist's items already fetched
      const wishlist = state.wishlistItems.find(
        (obj) => obj.wishlist == wishlistId
      );

      if (wishlist) return wishlist;

      // 1. fetch wishlist's items
      const wishlistItems = await FetchDocs(`wishlist/${wishlistId}/items`);

      // 2. for each wishlist's item check if it's has a subitems, if so, go fetch it
      for (const item of wishlistItems) {
        let subitems = await FetchDocs(
          `wishlist/${wishlistId}/items/${item.id}/items`
        );

        // if the item dons't have subitems, add emptiy array for future use
        if (!subitems.length) subitems = [];

        commit("SAVE_SUBITEMS", { itemId: item.id, subitems });
      }

      // 3. save fetched items locally
      commit("SAVE_WISHLIST_ITEMS", { wishlistId, items: wishlistItems });

      return wishlistItems;
    },

    // Add, Edit, Delete
    addNewWishlist({ commit }, { name, priority, due_date, userId }) {
      const newWishlistObj = {
        name,
        priority,
        due_date,
        done: false,
        progress: 0,
        total_cost: 0,
        user: userId,
      };

      AddDoc("wishlist", newWishlistObj).then((wishlist) => {
        // update localy
        commit("Add_NEW_WISHLIST_INTO_STATE", {
          id: wishlist.id,
          ...newWishlistObj,
        });
      });
    },
    async updateWishlist({ commit }, { id, name, priority, due_date }) {
      const wishlistObj = {
        name,
        priority,
        due_date,
      };

      await UpdateDoc("wishlist", id, wishlistObj);

      // update localy
      commit("UPDATE_WISHLIST", {
        id,
        ...wishlistObj,
      });
    },
    deleteWishlist({ commit }, { id }) {
      DeleteDoc("wishlist", id).then(() => {
        commit("REMOVE_WISHLIST_FROM_STATE", id);
      });
    },

    // Add, Edit, Delete item
    addNewItem({ commit }, { name, cost, priority, wishlistId, parentId }) {
      const newItemObj = {
        name,
        cost,
        priority,
        done: false,
      };

      const path = () =>
        parentId
          ? `wishlist/${wishlistId}/items/${parentId}/items`
          : `wishlist/${wishlistId}/items`;

      AddDoc(path(), newItemObj).then((newItem) => {
        // update localy
        commit("Add_NEW_ITEM_INTO_STATE", {
          wishlistId,
          parentId,
          newItemObj: {
            id: newItem.id,
            ...newItemObj,
          },
        });
      });
    },
    updateItem({ commit }, { id, name, cost, priority, wishlistId, parentId }) {
      const itemObj = {
        name,
        cost,
        priority,
      };

      const path = () =>
        parentId
          ? `wishlist/${wishlistId}/items/${parentId}/items`
          : `wishlist/${wishlistId}/items`;

      UpdateDoc(path(), id, itemObj);

      // update localy
      commit("UPDATE_ITEM", {
        wishlistId,
        parentId,
        itemObj: {
          id,
          ...itemObj,
        },
      });
    },
    deleteItem({ commit }, { id, wishlistId, parentId }) {
      const path = () =>
        parentId
          ? `wishlist/${wishlistId}/items/${parentId}/items`
          : `wishlist/${wishlistId}/items`;

      DeleteDoc(path(), id).then(() => {
        commit("REMOVE_ITEM_FROM_STATE", { wishlistId, parentId, id });
      });
    },
    changeItemStatus({ commit }, { parentWishlist, parentItem, item }) {
      console.log(parentWishlist, parentItem, item);
      const path = () =>
        parentItem
          ? `wishlist/${parentWishlist}/items/${parentItem}/items`
          : `wishlist/${parentWishlist}/items`;

      UpdateDoc(path(), item.id, {
        done: !item.done,
      });

      commit("CHANGE_ITEM_STATUS", { parentWishlist, parentItem, item });
    },
  },
};
