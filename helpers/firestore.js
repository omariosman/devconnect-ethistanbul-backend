const firebase = require('firebase/compat/app');
require('firebase/compat/firestore'); 
require('dotenv').config();

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = process.env;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const readFirestoreDocument = async (collectionId, docId) => {
    const documentReference = db.collection(collectionId).doc(docId);

    return documentReference.get()
        .then(doc => {
        if (!doc.exists) {
            console.log('Document not found');
            return null;
        } else {
            console.log('Document data:', doc.data());
            return doc.data();
        }
        })
        .catch(error => {
        console.error('Error getting document:', error);
        throw error; // You can handle the error as per your application's needs
        });
};

const writeFirestoreDocument = async (collectionId, docId, data) => {
    const documentReference = db.collection(collectionId).doc(docId);
    documentReference.update(data)
    .then(() => {
        console.log('Document successfully written to Firestore!');
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
    });
};

const readAllDocumentsFromCollection = async (collectionId) => {
    const collectionReference = db.collection(collectionId);
  
    return collectionReference.get()
      .then(snapshot => {
        const documents = [];
        snapshot.forEach(doc => {
          documents.push({
            id: doc.id,
            data: doc.data()
          });
        });
        return documents;
      })
      .catch(error => {
        console.error('Error getting documents from collection:', error);
        throw error;
      });
  };

const writeNestedDocs = async (mainCollection, docId, subCollection, data) => {
  const mainCollectionRef = await db.collection(mainCollection);
  const mainDocRef = await mainCollectionRef.doc(docId);
  const nestedCollectionRef = await mainDocRef.collection(subCollection);
  await nestedCollectionRef.doc().set(data, { merge: true });
}

const readNestedDocs = async (mainCollection, docId, subCollection) => {
  const mainCollectionRef = await db.collection(mainCollection);
  const mainDocRef = await mainCollectionRef.doc(docId);
  const nestedCollectionRef = await mainDocRef.collection(subCollection);
  const querySnapshot = await nestedCollectionRef.get();

  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs;
}


module.exports = {
    readFirestoreDocument,
    writeFirestoreDocument,
    readAllDocumentsFromCollection,
    writeNestedDocs,
    readNestedDocs
}