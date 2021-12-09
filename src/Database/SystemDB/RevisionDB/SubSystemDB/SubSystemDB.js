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

import { get, ref, set } from "firebase/database";
import Alert from "../../../../misc/Alert";
import database from "../../../../misc/firebase";
import { DBHelper } from "../../../DBHelper";
import { ComponentDB } from "./ComponentDB/ComponentDB";

export class SubSystemDB {
    static DBPARENT = 'SubSystem';
    static noIDErr = Error('Missing parent revision identification.');

    static read = async (revID) => {
        return await DBHelper.read(this.DBPARENT, revID);
    }

    static create = async (revID, name) => {
        return await DBHelper.create(this.DBPARENT, revID, name);
    }

    static delete = async (revID) => {
        try{
            if(!revID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${revID}`)
            
            //delete children first
            const subSysIDs = await get(db);
            const subSysIDsArr = Object.keys(subSysIDs.val() || []) ;
            for(let i = 0 ; i< subSysIDsArr.length; i++){
                const id = subSysIDsArr[i];
                await ComponentDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
            console.log(err);
        }
    }
}