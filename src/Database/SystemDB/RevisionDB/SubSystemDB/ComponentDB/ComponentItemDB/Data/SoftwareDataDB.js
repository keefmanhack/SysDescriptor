import { DataDB } from ".";

export class SoftWareDataDB {
    static DBPARENT = `SoftWareData`;

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

    static duplicate = async (orgID, dupID) => {
        await DataDB.duplicate(this.DBPARENT, orgID, dupID);
    }
}