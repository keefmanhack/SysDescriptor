import firebase from 'firebase/compat/';
import { get, ref, push, set, update } from 'firebase/database';

import Alert from "../../misc/Alert";
import {database} from "../../misc/firebase";
import { DBHelper } from "../DBHelper";
import { RevisionDB } from "./RevisionDB/RevisionDB";

export class SystemDB{
    static DBPARENT = 'systems';

    static readAll = async () => {
        try{
            const db = ref(database, `${this.DBPARENT}/`)
            const data = await get(db);
            return data.val();
        }catch(err){
            Alert.error(err);
        }
    }

    static read = async sysID => {
        return DBHelper.read(this.DBPARENT, sysID);
    }

    static addListener = (cb) => {
       return DBHelper.onValue(this.DBPARENT, '', cb);
    }

    static create = async (title='Untitled', owner=null, technician=null, sysNumber=null, partNumber=null) => {
        try{
            const db = ref(database, `${this.DBPARENT}/`)

            const payLoad = {
                title,
                owner,
                technician,
                sysNumber,
                partNumber,
                birthday: firebase.database.ServerValue.TIMESTAMP,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

            const data = await push(db, payLoad);
            return data.key;
        }catch(err){
            Alert.error(err);
        }
    }

    static update = async (sysID, title='Untitled', owner=null, technician=null, sysNumber=null, partNumber=null) => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            const updates= {
                title,
                owner,
                technician,
                sysNumber,
                partNumber,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            }

            await update(db, updates);

        }catch(err){
            Alert.error(err);
        }
    }


    static delete = async sysID => {
        try{
            if(!sysID){throw new Error('Missing system identification.')}

            const db = ref(database, `${this.DBPARENT}/${sysID}`)

            //  delete revisions first
            await RevisionDB.deleteAll(sysID);

            await set(db, null);
        }catch(err){
            Alert.error(err);
        }
    }

}