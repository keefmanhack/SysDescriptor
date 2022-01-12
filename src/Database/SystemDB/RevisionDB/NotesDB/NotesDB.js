import { get, ref, set } from "firebase/database";

import Alert from "../../../../misc/Alert";
import { database } from "../../../../misc/firebase";



export class NotesDB {
    static read = async (revID) => {
        try{
            if(!revID){throw new Error('Missing parent ID')}

            const db = ref(database, `Notes/${revID}`)

            const data = await get(db);

            return data.val();
        }catch(err){
            Alert.error(err.message);
        }
    }

    static update = async (revID, v) => {
        try{
            if(!revID){throw new Error('Missing parent ID')}

            const db = ref(database, `Notes/${revID}`)

            await set(db, v)

        }catch(err){
            Alert.error(err.message);
        }
    }
}