import firebase from "firebase/app";
import "firebase/firestore";

export const FetchDocs = (collection) => {
  return firebase
    .firestore()
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      return docs;
    })
    .catch((e) => {
      throw e;
    });
};

export const FetchSetOfDocs = (collection, condition) => {
  const [field, operation, value] = condition.split(" ");
  return firebase
    .firestore()
    .collection(collection)
    .where(field, operation, value)
    .get()
    .then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      return docs;
    })
    .catch((e) => {
      throw e;
    });
};
