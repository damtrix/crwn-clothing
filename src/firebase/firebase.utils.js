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

  firebase.initializeApp(config);

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters ({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase