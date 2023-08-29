// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBKZugG123ioex1larPnMMsMO1vZUP-x0",
  authDomain: "whatsapp-clone-dd6d5.firebaseapp.com",
  projectId: "whatsapp-clone-dd6d5",
  storageBucket: "whatsapp-clone-dd6d5.appspot.com",
  messagingSenderId: "668565655649",
  appId: "1:668565655649:web:cf88b78f1868d165211a20"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);

const db =firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider()
 export {db,auth,provider}