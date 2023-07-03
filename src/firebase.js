import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAJKqDg88X3Ivpz5GAKmN4BBtCzDeolio",
  authDomain: "chat-react-a946d.firebaseapp.com",
  projectId: "chat-react-a946d",
  storageBucket: "chat-react-a946d.appspot.com",
  messagingSenderId: "326331517951",
  appId: "1:326331517951:web:a28bb2329c2742ed7535ca",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const fb = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
//hacemos la conexion con la db
export const db = getFirestore();
