import { initializeApp} from 'firebase/app';
import { getDatabase } from "firebase/database";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "sysdescriptor.firebaseapp.com",
    projectId: "sysdescriptor",
    storageBucket: "sysdescriptor.appspot.com",
}

const app = initializeApp(config);

// Get a reference to the database service
const database = getDatabase(app);

export default database;