
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAVNV7-iY83f2rzIbqh8yHlnVmmtv56llk",
  authDomain: "todolist-f407c.firebaseapp.com",
  projectId: "todolist-f407c",
  storageBucket: "todolist-f407c.firebasestorage.app",
  messagingSenderId: "162965268928",
  appId: "1:162965268928:web:bf8eef88ec97ce13858025",
  measurementId: "G-YWBM602K8B"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
