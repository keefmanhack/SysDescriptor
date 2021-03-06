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
import Alert from "../../../../../misc/Alert";
import {database} from "../../../../../misc/firebase";
import { idObjToArr } from "../../../../../misc/helperfunc";
import { DBHelper } from "../../../../DBHelper";
import { ComponentItemDB } from "./ComponentItemDB/ComponentItemDB";

export class ComponentDB {
    static DBPARENT = 'Component';

    

    static read = async (subSysID) => {
        return DBHelper.read(this.DBPARENT, subSysID);
    }

    static addListener = async (subSysID, cb) => {
        return DBHelper.onValue(this.DBPARENT, subSysID, cb);
    }

    static create = async (subSysID, name) => {
        return DBHelper.create(this.DBPARENT, subSysID, name);
    }

    static duplicate = async (orgID, dupID) => {
        try{
            if(!orgID){throw new Error('Missing orginal identification.')}
            if(!dupID){throw new Error('Missing duplicate identification.')}

            const compDBs = idObjToArr(await this.read(orgID));
            for(let i =0; i<compDBs.length; i++){
                const comp = compDBs[i];
                const newCompID = await this.create(dupID, comp.name);
                await ComponentItemDB.duplicate(comp.id, newCompID);
            }
        }catch(err){
            Alert.error(err);
        }
    }


    static delete = async (subSysID) => {
        try{
            if(!subSysID){throw new Error('Missing parent sub-system identification.');}

            const db = ref(database, `${this.DBPARENT}/${subSysID}`)
            
            //  delete children first
            const compItemIDs = await get(db);
            const compItemIDsArr = Object.keys(compItemIDs.val() || []) ;
            for(let i = 0 ; i< compItemIDsArr.length; i++){
                const id = compItemIDsArr[i];
                ComponentItemDB.delete(id);
            }

            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }

    static deleteSpecific =  async (subSysID, id) => {
        try{
            if(!subSysID){throw Error('Missing parent sub-system identification.');}
            if(!id){throw Error('Missing component identification.');}

            const db = ref(database, `${this.DBPARENT}/${subSysID}/${id}`);

            await ComponentItemDB.delete(id);
            
            await set(db, null);

        }catch(err){
            Alert.error(err.message);
        }
    }
}