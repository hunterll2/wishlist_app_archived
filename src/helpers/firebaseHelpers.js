import firebase from "firebase/app";
import "firebase/firestore";

export const FetchDoc = (collection, condition) => {
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
      return docs[0];
    })
    .catch((e) => {
      throw e;
    });
};

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

export const AddDoc = (collection, data, docId) => {
  if (!docId) return firebase.firestore().collection(collection).add(data);
  else return firebase.firestore().collection(collection).doc(docId).set(data);
};

export const UpdateDoc = (collection, doc, data) => {
  return firebase.firestore().collection(collection).doc(doc).update(data);
};

export const DeleteDoc = (collection, doc) => {
  return firebase.firestore().collection(collection).doc(doc).delete();
};
