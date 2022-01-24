import { onValue, ref } from "firebase/database";
import { DataDB } from ".";
import Alert from "../../../../../../../misc/Alert";
import { database } from "../../../../../../../misc/firebase";

export class HardWareDataDB {
    static DBPARENT = `HardWareData`;

    static read = async componentID => {
       return DataDB.read(this.DBPARENT, componentID);
    }

    static onSpecificValue = async (componentID, spec, cb) => {
        try{
            const db = ref(database, `${this.DBPARENT}/${componentID}/${spec}`);
            
            onValue(db, snap => {    
                cb(snap.val());
            }, err => {
                Alert.error(err)
            })

            return db;
        }catch(err){
            Alert.error(err);
        }
    }

    static readSpecific = async (componentID, title) => {
        return DataDB.readSpecific(this.DBPARENT, componentID, title);
     }

    static update = async (componentID, title, value) => {
        await DataDB.update(this.DBPARENT, componentID, title, value);
    }

    static delete = async componentID => {
        await DataDB.delete(this.DBPARENT, componentID);
    }

    static duplicate = async (orgID, dupID) => {
        await DataDB.duplicate(this.DBPARENT, orgID, dupID);    }
}