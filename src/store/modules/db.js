import _ from "lodash/lang";
const uniqid = require("uniqid");

import {
  FetchDocs,
  FetchSetOfDocs,
  AddDoc,
  UpdateDoc,
  DeleteDoc,
} from "@/helpers/firebaseHelpers";

// helpers
const path = (wishlist, item) => {
  let path = "wishlist";
  if (wishlist) path += `/${wishlist}/items`;
  if (item) path += `/${item}/items`;
  return path;
};

// Item Class
class Item {
  items = [];

  constructor(id, name, { cost, done, priority, due_date }) {
    this.id = id;
    this.name = name;

    // wishlist
    this.due_date = due_date;

    // wishlist & item
    this.priority = priority;

    // item & subitem
    this.cost = cost;
    this.done = done;
  }

  // Setters & Getters
  // item's done status or item's progress based on total childs done / length
  set done(val) {
    this._done = !isNaN(val) && val >= 0 && val <= 100 ? val : 0;
  }

  get done() {
    return this.total_items > 0
      ? Math.round(this.total_progress / this.total_items)
      : this._done;
  }

  // item's cost or item's total childs costs
  set cost(val) {
    this._cost = !isNaN(val) && val >= 0 ? val : 0;
  }

  get cost() {
    return this.total_items > 0 ? this.total_cost : this._cost;
  }

  // Stringfy
  get getCostString() {
    return this.cost + " SAR";
  }

  get getProgressString() {
    return `${this.total_done} of ${this.total_items}`;
  }

  // calcaulated proprties
  get total_items() {
    return this.items.length;
  }

  get total_done() {
    return this.items.filter((item) => item.done == 100).length;
  }

  get total_cost() {
    return this.items.reduce((prev, cur) => prev + cur.cost, 0);
  }

  get total_progress() {
    return this.items.reduce((prev, cur) => prev + cur.done, 0);
  }

  get total_spent() {
    if (this.total_items)
      return this.items.reduce((prev, cur) => prev + cur.total_spent, 0);
    else return this.done == 100 ? this.cost : 0;
  }

  get remaining() {
    return this.total_cost - this.total_spent;
  }

  // Methods
  addItem(item) {
    this.items.push(item);
  }
  getItem(id) {
    return this.items.find((item) => item.id == id);
  }
  updateItem(id, data) {
    const item = this.items.find((item) => item.id == id);
    item.name = data.name ? data.name : item.name;
    item.cost = data.cost ? data.cost : item.cost;
    item.done = data.done ? data.done : item.done;
  }
  removeItem(id) {
    const itemIndex = this.items.findIndex((item) => item.id == id);
    this.items.splice(itemIndex, 1);
  }

  //
  getValues() {
    return {
      id: this.id,
      name: this.name,
      cost: this.cost,
      done: this.done,
    };
  }
}

export default {
  namespaced: true,

  state: {
    user_wishlists: null,
    changes: [],
  },

  getters: {
    getItem: (state) => (path, itemId) => {
      const [wishlistId, parentId] = path.split("/");

      let target = state.user_wishlists.items;
      if (wishlistId != "undefined")
        target = target.find((wishlist) => wishlist.id == wishlistId).items;
      if (parentId != "undefined")
        target = target.find((item) => item.id == parentId).items;

      return target.find((item) => item.id == itemId);
    },
    getChangesLog: (state) => state.changes,
  },

  mutations: {
    SET_USER_WISHLISTS_OBJECT(state, item) {
      state.user_wishlists = item;
    },

    ADD(state, { wishlistId, parentId, item }) {
      if (!(item instanceof Item)) return;

      // target parent item
      let target = state.user_wishlists;
      if (wishlistId) target = target.getItem(wishlistId);
      if (parentId) target = target.getItem(parentId);

      // operation
      target.addItem(item);
    },

    UPDATE(state, { wishlistId, parentId, item }) {
      // target parent item
      let target = state.user_wishlists;
      if (wishlistId) target = target.getItem(wishlistId);
      if (parentId) target = target.getItem(parentId);

      // operation
      target.updateItem(item.id, item);
    },

    REMOVE(state, { wishlistId, parentId, itemId }) {
      // target parent item
      let target = state.user_wishlists;
      if (wishlistId) target = target.getItem(wishlistId);
      if (parentId) target = target.getItem(parentId);

      // operation
      target.removeItem(itemId);
    },

    CHANGE_ITEM_STATUS(state, { wishlistId, parentId, itemId, done }) {
      let item = state.user_wishlists.getItem(wishlistId);
      if (parentId) item = item.getItem(parentId);
      item = item.getItem(itemId);
      item.done = done;
    },
  },

  actions: {
    initUserWishlistsObject({ commit }, { userId }) {
      return new Promise((resolve) => {
        commit("SET_USER_WISHLISTS_OBJECT", new Item(userId, "User Wishlists"));
        resolve(null);
      });
    },

    async init({ commit, state }, { userId }) {
      let arry;

      // level 1 - wishlists
      arry = await FetchSetOfDocs("wishlist", `user == ${userId}`);

      for (const wishlist of arry) {
        commit("ADD", {
          item: new Item(wishlist.id, wishlist.name, {
            priority: wishlist.priority,
            due_date: wishlist.due_date,
          }),
        });
      }

      // level 2 - items
      for (const wishlist of state.user_wishlists.items) {
        arry = await FetchDocs(path(wishlist.id));

        commit("ADD_LIST", {
          wishlistId: wishlist.id,
          items: arry,
        });

        // level 3 - subitems
        for (const item of wishlist.items) {
          arry = await FetchDocs(path(wishlist.id, item.id));

          if (arry.length == 0) continue;

          commit("ADD_LIST", {
            wishlistId: wishlist.id,
            parentId: item.id,
            items: arry,
          });
        }
      }
    },

    async operation(
      { getters, commit, dispatch },
      { type, wishlistId, parentId, itemId, item }
    ) {
      if (type == "change_status") {
        let newStatus = item.done == 0 ? 100 : 0;

        commit("CHANGE_ITEM_STATUS", {
          wishlistId,
          parentId,
          itemId,
          done: newStatus,
        });
      } else if (type == "add") {
        let newDoc = { ...item };

        if (wishlistId) {
          delete newDoc.due_date;
          delete newDoc.user;
        } else {
          delete newDoc.cost;
          delete newDoc.done;
        }

        if (parentId) {
          delete newDoc.priority;
        }

        let newId = uniqid();

        commit("ADD", {
          wishlistId,
          parentId,
          item: {
            id: newId,
            ...newDoc,
          },
        });
      } else if (type == "update") {
        let updateDoc = {
          name: item.name,
          cost: item.cost,
          priority: item.priority,
          due_date: item.due_date,
        };

        if (wishlistId) {
          delete updateDoc.due_date;
        } else {
          delete updateDoc.cost;
        }

        commit("UPDATE", {
          wishlistId,
          parentId,
          item: {
            id: itemId,
            ...updateDoc,
          },
        });
      } else if (type == "delete") {
        commit("REMOVE", {
          wishlistId,
          parentId,
          itemId,
        });
      }
    },
  },
};
