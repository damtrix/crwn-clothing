import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB7sbUwI333RrXdBMLTBXLRCch6kdFUWic",
    authDomain: "crwn-db-b90c2.firebaseapp.com",
    databaseURL: "https://crwn-db-b90c2.firebaseio.com",
    projectId: "crwn-db-b90c2",
    storageBucket: "crwn-db-b90c2.appspot.com",
    messagingSenderId: "416406432240",
    appId: "1:416406432240:web:a767aec4984d2a5c729535",
    measurementId: "G-CQVQBKYZ1E"
  }

 export const createUserProfileDocument = async (userAuth, additionData) => {
    if (!userAuth) return;
      
      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();
      
      if(!snapShot.exists) {
         const {displayName, email} = userAuth
         const createdAt = new Date();

         try {
            await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionData
            })
         } 
         catch(error){
            console.log('error creating user:', error.message);
         }
      }
      return userRef
      
 }

  export const addCollectionAddDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    
    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
       const newDocRef = collectionRef.doc()
       batch.set (newDocRef, obj)
    })
    return await batch.commit()
 } 

 export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
       const { title, items } = doc.data()

       return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id,
          title,
          items
       }
    })
    return transformedCollection.reduce((accumulator, collection) => {
       accumulator[collection.title.toLowerCase()] = collection
       return accumulator
    }, {})
      
 }


  firebase.initializeApp(config);

  export const getCurrentUser = () => {
     return new Promise((resolve, reject) => {
        const unSubscribe = auth.onAuthStateChanged(userAuth => {
           unSubscribe()
           resolve(userAuth)
        }, reject)
     })
  } 

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  export const googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters ({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

  export default firebase 