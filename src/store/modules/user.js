import firebase from "firebase/app";
import "firebase/auth";

import {
  FetchDoc,
  FetchDocs,
  AddDoc,
  UpdateDoc,
  DeleteDoc,
} from "@/helpers/firebaseHelpers";

export default {
  namespaced: true,
  state: {
    saving: {
      // monthly incmes/expenses
      incomes: [],
      expenses: [],

      // fixed saving amount for one time
      personal_saving: 500,

      // auto calculated values
      total_incomes: 2400,
      total_expenses: 570,
      monthly_budget: 1830, // total_incomes - total_expenses
      current_budget: 2330, // (monthly_budget * n) + personal_saving
    },
  },
  getters: {
    getUserSavingData: (state) => state.saving,
  },
  mutations: {
    SET_USER_SAVING_DATA(state, data) {
      state.saving = data;
    },
  },
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
    async fetchUserSavingData({ commit }, uid) {
      const savingData = await FetchDoc("saving", `user == ${uid}`);

      if (!savingData) return false;

      const incomes = await FetchDocs(`saving/${savingData.id}/incomes`);
      const expenses = await FetchDocs(`saving/${savingData.id}/expenses`);

      savingData.incomes = incomes;
      savingData.expenses = expenses;

      commit("SET_USER_SAVING_DATA", savingData);

      return true;
    },
    addSavingDataItem({ state }, { type, id, name, amount }) {
      return AddDoc(
        `saving/${state.saving.id}/${type}`,
        {
          name,
          amount,
        },
        id
      );
    },
    updateSavingDataItem({ state }, { type, id, name, amount }) {
      return UpdateDoc(`saving/${state.saving.id}/${type}`, id, {
        name,
        amount,
      });
    },
    deleteSavingDataItem({ state }, { type, id }) {
      return DeleteDoc(`saving/${state.saving.id}/${type}`, id);
    },

    updatePersonalSaving({ state }, { newAmount }) {
      return UpdateDoc(`saving/`, state.saving.id, {
        personal_saving: newAmount,
      });
    },
  },
};
