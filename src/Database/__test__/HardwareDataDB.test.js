import { HardWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/HarwareDataDB";

it('can update db', async () => {
    await HardWareDataDB.update('someRandomID', 'the title', 'the new value')

    const data = await HardWareDataDB.readSpecific('someRandomID', 'the title');

    expect(data.value).toEqual('the new value');

    await HardWareDataDB.delete('someRandomID');
})

it('can update delete db item', async () => {
    await HardWareDataDB.update('anotherID', 'the title', 'the new value')
    await HardWareDataDB.delete('anotherID');

    const data = await HardWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})