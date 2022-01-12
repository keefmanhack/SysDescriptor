import { initializeApp} from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "AIzaSyBWWEHMZLwhbc4VLsmwhvF5Nv1HjxZ15QQ",
  authDomain: "sysdescriptor.firebaseapp.com",
  databaseURL: "https://sysdescriptor-default-rtdb.firebaseio.com",
  projectId: "sysdescriptor",
  storageBucket: "sysdescriptor.appspot.com",
  messagingSenderId: "1070055316533",
  appId: "1:1070055316533:web:bb96f1aab8f9cde30ba57c",
  measurementId: "G-CZ32SF38K8"
}

const app = initializeApp(config);

export const database = getDatabase(app);
export const auth = getAuth(app);