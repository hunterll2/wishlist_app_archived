import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW3exQMHcX-IiHcBHByBxLedSbJkDUvbw",
  authDomain: "wishlistapp-643a6.firebaseapp.com",
  projectId: "wishlistapp-643a6",
  storageBucket: "wishlistapp-643a6.appspot.com",
  messagingSenderId: "657412770551",
  appId: "1:657412770551:web:3fabf95ae13f80c261e1f2",
  measurementId: "G-0F19Z4DJ32",
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
