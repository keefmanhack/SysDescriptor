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
import Alert from "../../../../../../misc/Alert";
import database from "../../../../../../misc/firebase";
import { DBHelper } from "../../../../../DBHelper";
import { HardWareDataDB } from "./Data/HarwareDataDB";
import { SoftWareDataDB } from "./Data/SoftwareDataDB";

export class ComponentItemDB {
    static DBPARENT = 'ComponentItems';

    static NoIDErr = Error('Missing parent sub-component identification.');

    static read = async (compID) => {
        return DBHelper.read(this.DBPARENT, compID);
    }

    static addListener = (compID, cb) => {
        return DBHelper.onValue(this.DBPARENT, compID, cb)
    }


    static create = async (compID, name) => {
        return DBHelper.create(this.DBPARENT, compID, name);
    }

    static delete = async (compID) => {
        try{
            if(!compID){throw new this.NoIDErr}

            const db = ref(database, `${this.DBPARENT}/${compID}`)
            
            //  delete children first
            const componentIDs = await get(db);
            const compIDsArr = Object.keys(componentIDs.val() || []) ;
            for(let i = 0 ; i< compIDsArr.length; i++){
                const id = compIDsArr[i];
                SoftWareDataDB.delete(id);
                HardWareDataDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }

    static deleteSpecific = async (compID, compItemID) => {
        try{
            if(!compID){throw new this.NoIDErr}
            if(!compItemID){throw new this.NoIDErr}


            const db = ref(database, `${this.DBPARENT}/${compID}/${compItemID}`);
            
           await SoftWareDataDB.delete(compItemID);
           await HardWareDataDB.delete(compItemID);

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }
}