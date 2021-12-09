/* 
Requirements
------------
1) Update value
2) Read value
2) Delete value


FunctionInputs
--------------
1) Parent Component ID
*/

import { get, ref, set } from "firebase/database";
import firebase from 'firebase/compat/';
import Alert from "../../misc/Alert"
import database from "../../misc/firebase";


export class DataDB {
    static read = async (DBPARENT, componentID) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }


    static update = async (DBPARENT, componentID, value, title) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}`)

            const payLoad = {
                value,
                title,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

            await set(db, payLoad);

        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }

    static delete = async (DBPARENT, componentID) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}`)

            await set(db, null);

        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }
}