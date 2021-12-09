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
import Alert from "../../../../../misc/Alert";
import database from "../../../../../misc/firebase";
import { DBHelper } from "../../../../DBHelper";
import { ComponentItemDB } from "./ComponentItemDB/ComponentItemDB";

export class ComponentDB {
    static DBPARENT = 'Component';
    static noIDErr = Error('Missing parent sub-system identification.');

    static read = async (subSysID) => {
        return await DBHelper.read(this.DBPARENT, subSysID);
    }

    static create = async (subSysID, name) => {
        return await DBHelper.create(this.DBPARENT, subSysID, name);
    }

    static delete = async (subSysID) => {
        try{
            if(!subSysID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${subSysID}`)
            
            //delete children first
            const compItemIDs = await get(db);
            const compItemIDsArr = Object.keys(compItemIDs.val() || []) ;
            for(let i = 0 ; i< compItemIDsArr.length; i++){
                const id = compItemIDsArr[i];
                await ComponentItemDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }
}