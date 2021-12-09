import { makeid } from "../../misc/helperfunc"
import { RevisionDB } from "../SystemDB/RevisionDB/RevisionDB";
import { SubSystemDB } from "../SystemDB/RevisionDB/SubSystemDB/SubSystemDB";

it('Can create revisions', async () => {
    const sysID1 = makeid();

    await RevisionDB.create(sysID1);
    await RevisionDB.create(sysID1);

    const data = await RevisionDB.readAll(sysID1);

    expect(Object.keys(data).length).toEqual(2);

    await RevisionDB.deleteAll(sysID1);
    
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