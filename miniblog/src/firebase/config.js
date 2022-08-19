import { initializeApp } from "firebase/app";
import { getFirebase } from 'firebase/firebase'


const firebaseConfig = {
  apiKey: "AIzaSyC3Lv4yM_Qe0-AVd5W08AwBaJajnIZgCxo",
  authDomain: "miniblog-bff95.firebaseapp.com",
  projectId: "miniblog-bff95",
  storageBucket: "miniblog-bff95.appspot.com",
  messagingSenderId: "85316309243",
  appId: "1:85316309243:web:0c49c5ab2f1227111f605e"
};

const app = initializeApp(firebaseConfig);
const db = getFirebase(app);

export { db };