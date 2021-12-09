/* 
Requirements
------------
1) Create
2) Read 
2) Delete 


FunctionInputs
--------------
1) Parent SUB_COMPONENT_ID
*/

import { get, push, ref, set } from "firebase/database";
import Alert from "../misc/Alert";
import database from "../misc/firebase";
import { HardWareDataDB } from "./Data/HarwareDataDB";
import { SoftWareDataDB } from "./Data/SoftwareDataDB";

export class ComponentDB {
    static DBPARENT = 'Components';
    static noIDErr = Error('Missing parent sub-component identification.');

    static read = async (subCompID) => {
        try{
            if(!subCompID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${subCompID}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }


    static create = async (subCompID) => {
        try{
            if(!subCompID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${subCompID}`)

            const key = await push(db, {newID: 'asdkjf'}).key;
            
            return key

        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }

    static delete = async (subCompID) => {
        try{
            if(!subCompID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${subCompID}`)
            
            //delete children first
            const componentIDs = await get(db);
            const compIDsArr = Object.keys(componentIDs) || [];
            for(let i = 0 ; i< compIDsArr.length(); i++){
                const id = compIDsArr[i];
                await SoftWareDataDB.delete(id);
                await HardWareDataDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }
}