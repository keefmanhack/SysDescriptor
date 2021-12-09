
import { get, ref, set, push, update} from "firebase/database";
import firebase from 'firebase/compat/';
import { SubSystemDB } from "./SubSystemDB/SubSystemDB";
import Alert from "../../../misc/Alert";
import { DBHelper } from "../../DBHelper";
import database from "../../../misc/firebase";


export class RevisionDB {
    static DBPARENT = 'revisions';
    static readAll = async (sysID) => {
        return await DBHelper.read(this.DBPARENT, sysID);
    }

    static onValue = (sysID, cb) => {
        DBHelper.onValue(this.DBPARENT, sysID, cb);
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
            console.log(err);
        }
    }

    static create = async (sysID, title='Untitled', utfNumber=0) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            const payLoad = {
                title,
                utfNumber,
                birthday: firebase.database.ServerValue.TIMESTAMP,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

           const data = await push(db, payLoad);
           return data.key
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }


    static updateByKey = async (sysID, revID, key, value) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}
            if(!revID){throw new Error('Missing revision identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}/${revID}`)

            const payLoad = {
                [key] : value,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

            await set(db, payLoad);
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }

    static deleteSpecific = async (sysID, revID) => {
        try{
            if(!sysID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}/${revID}`)

            //delete sub systems first
            await SubSystemDB.delete(revID);

            await set(db, null);

        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }


    static deleteAll = async (sysID) => {
        try{
            if(!sysID){throw new Error('Missing parent component identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            //delete sub systems first
            const revIDs = await get(db);
            const revIDsArr = Object.keys(revIDs.val() || []) ;
            for(let i = 0 ; i< revIDsArr.length; i++){
                const id = revIDsArr[i];
                await SubSystemDB.delete(id);
            }

            await set(db, null);
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }
}