import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCsw0ZYZ2Mm4_1-vS1i9Dy3fdxbyKIes8k",
  authDomain: "pixie-34cf9.firebaseapp.com",
  databaseURL: "gs://pixie-34cf9.appspot.com",
  projectId: "pixie-34cf9",
  storageBucket: "pixie-34cf9.appspot.com",
  messagingSenderId: "1036766005545",
  appId: "1:1036766005545:web:56257d58550769ce794f38",
  measurementId: "G-2CG95CRMZD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

  const stor = firebase.storage();
  const fires = firebase.firestore();
  const auth = firebase.auth();
  export {stor, fires, auth, firebase as default};