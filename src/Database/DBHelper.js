import { get, ref, push } from "firebase/database";
import firebase from 'firebase/compat/';

import Alert from "../misc/Alert";
import database from "../misc/firebase";

export class DBHelper {
    static read = async (DBPARENT, id) => {
        try{
            if(!id){throw new Error('Missing parent ID')}

            const db = ref(database, `${DBPARENT}/${id}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }
    static create = async (DBPARENT, id, name) => {
        try{
            if(!id){throw new Error('Missing parent ID')}

            const db = ref(database, `${DBPARENT}/${id}`)

            const payLoad = {
                name,
                birthdate: firebase.database.ServerValue.TIMESTAMP
            }

            const key = await push(db, payLoad).key;
            
            return key

        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }

    static onValue = (DBPARENT, id, cb) => {
        try{
            if(!id){throw new Error('Missing identification.')}

            const db = ref(database, `${DBPARENT}/${id}`);

            onValue(db, snap => {
                cb(snap.val());
            }, err => {
                Alert.error(err)
            })

        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }
}