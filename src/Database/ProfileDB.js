import { get, ref, update } from "firebase/database";
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

    static create = async (firstName, lastName, email, activeStatus=false) => {
        try{
            const db = ref(database, `profiles/`)

            const payLoad = {
                firstName,
                lastName,
                email,
                activeStatus,
                birthdate: firebase.database.ServerValue.TIMESTAMP
            }

            const id = await update(db, payLoad);
            
            return id
        }catch(err){
            Alert.error(err.message);
        }
    }
}