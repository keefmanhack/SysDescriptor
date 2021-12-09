import { SoftWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB";

it('can update db', async () => {
    await SoftWareDataDB.update('someRandomID', 'the new value', 'the title')

    const data = await SoftWareDataDB.read('someRandomID');

    expect(data.value).toEqual('the new value');
    expect(data.title).toEqual('the title');

    await SoftWareDataDB.delete('someRandomID');
})

it('can update delete db item', async () => {
    await SoftWareDataDB.update('anotherID', 'the new value', 'the title')
    await SoftWareDataDB.delete('anotherID');

    const data = await SoftWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})