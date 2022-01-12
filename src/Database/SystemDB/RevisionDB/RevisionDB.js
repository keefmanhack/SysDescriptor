
import { get, ref, set, push} from "firebase/database";
import firebase from 'firebase/compat/';
import { SubSystemDB } from "./SubSystemDB/SubSystemDB";
import Alert from "../../../misc/Alert";
import { DBHelper } from "../../DBHelper";
import {database} from "../../../misc/firebase";


export class RevisionDB {
    static DBPARENT = 'revisions';
    
    static readAll = async (sysID) => {
        return DBHelper.read(this.DBPARENT, sysID);
    }

    static addListener = (sysID, cb) => {
       return DBHelper.onValue(this.DBPARENT, sysID, cb);
    }

    static readSpecific = async (sysID, revID) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}
            if(!revID){throw new Error('Missing revision identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}/${revID}`)

            const data = await get(db);
            return data.val()
        }catch(err){
            Alert.error(err);
        }
    }

    static create = async (sysID, name='Untitled', revNumber=0) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            const payLoad = {
                name,
                revNumber,
                birthday: firebase.database.ServerValue.TIMESTAMP,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

           const data = await push(db, payLoad);
           return data.key
        }catch(err){
            Alert.error(err);
        }
    }


    static updateByKey = async (sysID, revID, key, value) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}
            if(!revID){throw new Error('Missing revision identification.')}

            let db = ref(database, `${this.DBPARENT}/${sysID}/${revID}/${key}`)

            await set(db, value);

            db = ref(database, `${this.DBPARENT}/${sysID}/${revID}/lastUpdated`);
            await set(db, firebase.database.ServerValue.TIMESTAMP)
        }catch(err){
            Alert.error(err);
        }
    }

    static deleteSpecific = async (sysID, revID) => {
        try{
            if(!sysID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}/${revID}`)

            //  delete sub systems first
            await SubSystemDB.delete(revID);

            await set(db, null);

        }catch(err){
            Alert.error(err);
        }
    }


    static deleteAll = async (sysID) => {
        try{
            if(!sysID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            //  delete sub systems first
            const revIDs = await get(db);
            const revIDsArr = Object.keys(revIDs.val() || []) ;
            for(let i = 0 ; i< revIDsArr.length; i++){
                const id = revIDsArr[i];
                SubSystemDB.delete(id);
            }

            await set(db, null);
        }catch(err){
            Alert.error(err);
        }
    }
}