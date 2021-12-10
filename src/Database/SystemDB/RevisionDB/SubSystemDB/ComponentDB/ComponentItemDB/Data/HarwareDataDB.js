import { DataDB } from ".";

export class HardWareDataDB {
    static DBPARENT = `HardWareData`;

    static read = async componentID => {
       return DataDB.read(this.DBPARENT, componentID);
    }

    static update = async (componentID, value, title) => {
        await DataDB.update(this.DBPARENT, componentID, value, title);
    }

    static delete = async componentID => {
        await DataDB.delete(this.DBPARENT, componentID);
    }
}