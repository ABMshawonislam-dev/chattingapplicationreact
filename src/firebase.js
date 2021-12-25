import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { getDatabase, ref, push, set,onValue,child, get,onChildAdded,onChildChanged } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCda-F6LmHuaas10at4i7WTS_OWP8kXC2g",
  authDomain: "mern-a.firebaseapp.com",
  projectId: "mern-a",
  storageBucket: "mern-a.appspot.com",
  messagingSenderId: "849813857485",
  appId: "1:849813857485:web:6be7a5373038237799b584"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export{getAuth, createUserWithEmailAndPassword,updateProfile,getDatabase, ref, set,signInWithEmailAndPassword,signOut,push,onValue,child, get,onChildAdded,onChildChanged,storage }