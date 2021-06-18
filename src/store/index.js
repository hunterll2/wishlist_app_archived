import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import db from "./modules/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page_title: "",
  },
  mutations: {
    UPDATE_PAGE_TITLE(state, title) {
      state.page_title = title;
    },
  },
  actions: {
    updatePageTitle({ commit }, title) {
      commit("UPDATE_PAGE_TITLE", title);
    },
  },
  modules: { auth, user, db },
});
