import { FetchDocs, FetchSetOfDocs } from "@/helpers/firebaseHelpers";

export default {
  namespaced: true,

  state: {
    all_wishlist: [],
    itemsOfParent: [],
  },

  getters: {
    getItemsOfParent: (state) => (parentId) =>
      state.itemsOfParent.find((item) => item.parent === parentId).items,
  },

  mutations: {
    SET_USER_WISHLIST_ARRAY(state, wishlistArray) {
      state.all_wishlist = wishlistArray;
    },
    SAVE_ITEMS_OF_PARENT(state, { parentId, items }) {
      const isAlreadySaved = state.itemsOfParent.some(
        (item) => item.parent === parentId
      );

      if (!isAlreadySaved)
        state.itemsOfParent.push({ parent: parentId, items });
    },
  },

  actions: {
    fetchAllUserWishlist({ state, commit }, { userId }) {
      if (state.all_wishlist.length > 0) {
        console.log("wishlist already fetched");
        return;
      }

      FetchSetOfDocs("wishlist", `user == ${userId}`)
        .then((wishlistArray) => {
          commit("SET_USER_WISHLIST_ARRAY", wishlistArray);
        })
        .catch((e) => console.log(e));
    },

    async fetchItemsOfParent({ state, commit }, { parentId }) {
      // check if wishlist's items already fetched
      const wishlist = state.itemsOfParent.find(
        (wishlist) => wishlist.parent == parentId
      );

      if (wishlist) {
        console.log("wishlist items already fetched");
        return wishlist;
      }

      // fetch wishlist's items
      const wishlistItems = await FetchDocs(`wishlist/${parentId}/items`);

      // for each wishlist's item check if it's has a subitems
      // if so, go fetch it
      for (const item of wishlistItems) {
        const subitems = await FetchDocs(
          `wishlist/${parentId}/items/${item.id}/items`
        );
        if (subitems.length) item.subitems = subitems;
      }

      commit("SAVE_ITEMS_OF_PARENT", { parentId, items: wishlistItems });

      return wishlistItems;
    },
  },
};
