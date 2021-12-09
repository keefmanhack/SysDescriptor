import { DataDB } from ".";

export class SoftWareDataDB {
    static DBPARENT = `SoftWareData`;

    static read = async componentID => {
        return (await DataDB.read(this.DBPARENT, componentID));
    }

    static update = async (componentID, value, title) => {
        await DataDB.update(this.DBPARENT, componentID, value, title);
    }

    static delete = async componentID => {
        await DataDB.delete(this.DBPARENT, componentID);
    }
}