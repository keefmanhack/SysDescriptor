import { SoftWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB";

it('can update db', async () => {
    await SoftWareDataDB.update('someRandomID','the title', 'the new value')

    const data = await SoftWareDataDB.readSpecific('someRandomID', 'the title');

    expect(data.value).toEqual('the new value');

    await SoftWareDataDB.delete('someRandomID');
})

it('can update delete db item', async () => {
    await SoftWareDataDB.update('anotherID', 'the title', 'the value')
    await SoftWareDataDB.delete('anotherID');

    const data = await SoftWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})