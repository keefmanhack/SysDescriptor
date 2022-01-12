import { get, ref, set } from "firebase/database";
import firebase from 'firebase/compat/';

import Alert from "../misc/Alert";
import {database} from "../misc/firebase";

export class ProfileDB {
    static read = async (uid) => {
        try{
            if(!uid){throw new Error('Missing parent ID')}

            const db = ref(database, `profiles/${uid}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err.message);
        }
    }

    static create = async (uid, firstName, lastName, email) => {
        try{
            if(!uid){throw new Error('Missing parent ID')}

            const db = ref(database, `profiles/${uid}`)

            const payLoad = {
                firstName,
                lastName,
                email,
                birthdate: firebase.database.ServerValue.TIMESTAMP
            }

            const key = await set(db, payLoad);
            
            return key
        }catch(err){
            Alert.error(err.message);
        }
    }
}