import { DataDB } from ".";

export class HardWareDataDB {
    static DBPARENT = `HardWareData`;

    static read = async componentID => {
       return DataDB.read(this.DBPARENT, componentID);
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
}