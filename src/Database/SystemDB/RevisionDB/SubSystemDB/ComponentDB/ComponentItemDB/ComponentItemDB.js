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
    static noIDErr = Error('Missing parent sub-component identification.');

    static read = async (compID) => {
        return await DBHelper.read(this.DBPARENT, compID);
    }


    static create = async (compID, name) => {
        return await DBHelper.create(this.DBPARENT, compID, name);
    }

    static delete = async (compID) => {
        try{
            if(!compID){throw new this.noIDErr}

            const db = ref(database, `${this.DBPARENT}/${compID}`)
            
            //delete children first
            const componentIDs = await get(db);
            const compIDsArr = Object.keys(componentIDs.val() || []) ;
            for(let i = 0 ; i< compIDsArr.length; i++){
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