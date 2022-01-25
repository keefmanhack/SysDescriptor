import { idObjToArr, makeid } from "../../misc/helperfunc"
import { RevisionDB } from "../SystemDB/RevisionDB/RevisionDB";
import { SubSystemDB } from "../SystemDB/RevisionDB/SubSystemDB/SubSystemDB";
import { SystemDB } from "../SystemDB/SystemDB";

it('Can create revisions', async () => {
    const sysID1 = makeid();

    await RevisionDB.create(sysID1);
    await RevisionDB.create(sysID1);

    const data = await RevisionDB.readAll(sysID1);

    expect(Object.keys(data).length).toEqual(2);

    await RevisionDB.deleteAll(sysID1);
    
})

it('Can move a rev to new system', async () => {
    const sys1ID = await SystemDB.create('sys1test');
    const sys2ID = await SystemDB.create('sys2test');

    const revID = await RevisionDB.create(sys1ID, 'rev name');
    await RevisionDB.move(sys1ID, revID, sys2ID);

    const sys1Rev =  idObjToArr(await RevisionDB.readAll(sys1ID));
    const sys2Rev =  idObjToArr(await RevisionDB.readAll(sys2ID));

    expect(sys1Rev.length).toEqual(0);
    expect(sys2Rev.length).toEqual(1);
    
    expect(sys2Rev[0].name).toEqual('rev name');

    await SystemDB.delete(sys1ID);
    await SystemDB.delete(sys2ID);
} )

it('Can make a duplicate', async () => {
    const id = `${makeid(5)}test`;

    const revID = await RevisionDB.create(id, 'rev name');
    const dupID = await RevisionDB.duplicate(id, revID);

    const dupRev = await RevisionDB.readSpecific(id, dupID);

    expect(dupRev.name).toEqual('rev name-dup');

    await RevisionDB.deleteAll(id);
})

it ('Can update a specific revision', async () => {
    const id = makeid();

    await RevisionDB.create(id);

    const rev = Object.keys(await RevisionDB.readAll(id))[0];


    await RevisionDB.updateByKey(id, rev, 'title', 'new title');

    const data = await RevisionDB.readSpecific(id,rev);

    expect(data.title).toEqual('new title');
    await RevisionDB.deleteAll(id);
})

it('Can delete a specific revision', async ()=> {
    const id = makeid();
    await RevisionDB.create(id);
    const rev = Object.keys(await RevisionDB.readAll(id))[0];
    await SubSystemDB.create(rev, 'any name');

    await RevisionDB.deleteSpecific(id, rev);

    const revisions = await RevisionDB.readAll(id);
    const subSystems = await SubSystemDB.read(rev);

    expect(subSystems).toEqual(null);
    expect(revisions).toEqual(null);
})