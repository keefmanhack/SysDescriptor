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
import {database} from "../../../../misc/firebase";
import { DBHelper } from "../../../DBHelper";
import { ComponentDB } from "./ComponentDB/ComponentDB";

export class SubSystemDB {
    static DBPARENT = 'SubSystem';

    static NoIDErr = Error('Missing parent revision identification.');

    static addListener = async (revID, cb) => {
        return DBHelper.onValue(this.DBPARENT, revID, cb);
    }

    static read = async (revID) => {
        return DBHelper.read(this.DBPARENT, revID);
    }

    static create = async (revID, name) => {
        return DBHelper.create(this.DBPARENT, revID, name);
    }

    static delete = async (revID) => {
        try{
            if(!revID){throw new this.NoIDErr}

            const db = ref(database, `${this.DBPARENT}/${revID}`)
            
            //  delete children first
            const subSysIDs = await get(db);
            const subSysIDsArr = Object.keys(subSysIDs.val() || []) ;
            for(let i = 0 ; i< subSysIDsArr.length; i++){
                const id = subSysIDsArr[i];
                ComponentDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }

    static deleteSpecific = async (revID, subSysID) => {
        try{
            if(!revID){throw new this.NoIDErr}
            if(!subSysID){throw new this.NoIDErr}

            const db = ref(database, `${this.DBPARENT}/${revID}/${subSysID}`)
            
            await ComponentDB.delete(subSysID);

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }
}