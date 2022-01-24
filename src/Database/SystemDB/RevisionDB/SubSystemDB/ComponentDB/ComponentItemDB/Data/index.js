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
import Alert from "../../../../../../../misc/Alert";
import {database} from "../../../../../../../misc/firebase";
import { idObjToArr } from "../../../../../../../misc/helperfunc";


export class DataDB {
    static read = async (DBPARENT, componentID) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err);
        }
    }

    static readSpecific = async (DBPARENT, componentID, title) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}
            if(!title){throw new Error('Need title to retreive data')}

            const db = ref(database, `${DBPARENT}/${componentID}/${title}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err);
        }
    }


    static update = async (DBPARENT, componentID, title, value) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}/${title}`)

            const payLoad = {
                value,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

            await set(db, payLoad);

        }catch(err){
            Alert.error(err);
        }
    }

    static delete = async (DBPARENT, componentID) => {
        try{
            if(!componentID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${DBPARENT}/${componentID}`)

            await set(db, null);

        }catch(err){
            Alert.error(err);
        }
    }

    static duplicate = async (DBPARENT, orgID, dupID) => {
        try{
            if(!orgID){throw new Error('Missing orginal identification.')}
            if(!dupID){throw new Error('Missing duplicate identification.')}

            const items = idObjToArr(await this.read(DBPARENT, orgID)); 
            for(let i =0; i<items.length; i++){
                const item = items[i];
                await this.update(DBPARENT, dupID, item.id, item.value);
            }
        }catch(err){
            Alert.error(err);
        }
    }
}