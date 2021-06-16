import firebase from "firebase/app";
import "firebase/auth";

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubscribeAuthObserver: null,
  },

  getters: {
    authUser(state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null;
    },
  },

  actions: {
    initAuthentication({ commit, state }) {
      return new Promise((resolve) => {
        // unsubscribe observer if already listening
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver();
        }

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          console.log("👣 the user has changed", user);

          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        });

        commit("setUnsubscribeAuthObserver", unsubscribe);
      });
    },

    registerUserWithEmailAndPassword(context, { email, password }) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((e) => {
          throw e;
        });
    },

    signInWithEmailAndPassword(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signOut({ commit }) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setAuthId", null);
        });
    },

    fetchAuthUser() {
      return firebase.auth().currentUser;
    },
  },

  mutations: {
    setAuthId(state, id) {
      state.authId = id;
    },

    setUnsubscribeAuthObserver(state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe;
    },
  },
};
