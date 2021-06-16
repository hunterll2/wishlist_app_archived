import firebase from "firebase/app";
import "firebase/auth";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    updateUserPassword(context, { email, curPassword, newPassword }) {
      const user = firebase.auth().currentUser;

      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        curPassword
      );

      return user
        .reauthenticateWithCredential(credential)
        .then(() => {
          return user.updatePassword(newPassword).catch((e) => {
            throw e;
          });
        })
        .catch((e) => {
          throw e;
        });
    },
  },
};
