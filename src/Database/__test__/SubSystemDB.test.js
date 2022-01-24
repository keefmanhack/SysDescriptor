import { idObjToArr, makeid } from "../../misc/helperfunc";
import { ComponentDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB";
import { SubSystemDB } from "../SystemDB/RevisionDB/SubSystemDB/SubSystemDB";

it('Can create a subSys id', async () => {
    const id = `${makeid(5)}test`;

    await SubSystemDB.create(id, 'sub sys name');

    const data = await SubSystemDB.read(id);

    expect(Object.keys(data).length).toEqual(1);

    await SubSystemDB.delete(id);

})

it('Can make a duplicate', async () => {
    const id = `${makeid(5)}test`;
    const dupID = `${makeid(5)}test`;

    await SubSystemDB.create(id, 'subsys name');
    await SubSystemDB.duplicate(id, dupID);

    const dupsubSys = idObjToArr(await SubSystemDB.read(dupID));

    expect(dupsubSys[0].name).toEqual('subsys name');


    await SubSystemDB.delete(id);
    await SubSystemDB.delete(dupID);
})

it('Can delete the sub system and all of its children', async () => {
    const id = `${makeid(5)}test`;

    const subSysID = await SubSystemDB.create(id, 'sub sys name');
    await ComponentDB.create(subSysID, 'component name');

    await SubSystemDB.delete(id);

    const component = await ComponentDB.read(subSysID);
    const subSystem = await SubSystemDB.read(id);

    expect(component).toEqual(null);
    expect(subSystem).toEqual(null);
})