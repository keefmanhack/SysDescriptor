import { RevisionDB } from "../SystemDB/RevisionDB/RevisionDB";
import { SystemDB } from "../SystemDB/SystemDB"

it('Can create a system', async () => {
    const id = await SystemDB.create();

    const sys = await SystemDB.read(id);

    expect(sys.title).toEqual('Untitled');

    await SystemDB.delete(id);
})

it('Can update a system', async () => {
    const id = await SystemDB.create();

    await SystemDB.update(id, 'some title');

    const sys =  await SystemDB.read(id);

    expect(sys.title).toEqual('some title');

    await SystemDB.delete(id);
})

it('Can delete a system', async () => {
    const id = await SystemDB.create();
    const revID = await RevisionDB.create(id);

    await SystemDB.delete(id);

    const rev = await RevisionDB.readSpecific(id, revID);
    const sys = await SystemDB.read(id);

    expect(rev).toEqual(null);
    expect(sys).toEqual(null);
    
})