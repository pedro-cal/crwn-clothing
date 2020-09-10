import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAZqeGy3fIPZns0COSQUgCjcfqY6doZBmY",
    authDomain: "crwn-db-e42a2.firebaseapp.com",
    databaseURL: "https://crwn-db-e42a2.firebaseio.com",
    projectId: "crwn-db-e42a2",
    storageBucket: "crwn-db-e42a2.appspot.com",
    messagingSenderId: "735328332266",
    appId: "1:735328332266:web:7df03cb628aec9a864aa93",
    measurementId: "G-K2D52W1W1V"
  };

//* NEEDS FURTHER EXPLORATION 
//* Will be called in App.js in componentDidMount unsubscribeFromAuth 
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;