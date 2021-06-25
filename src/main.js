import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// Firebase config
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

// Automatic Global Registration of Base Components
const requireComponent = require.context(
  "./components",
  false,
  /App[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

// Events Bus

const eventBus = {};

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue();
};

Vue.use(eventBus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
