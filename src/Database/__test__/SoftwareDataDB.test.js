import { idObjToArr, makeid } from "../../misc/helperfunc";
import { SoftWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB";

it('can update db', async () => {
    await SoftWareDataDB.update('someRandomID','the title', 'the new value')

    const data = await SoftWareDataDB.readSpecific('someRandomID', 'the title');

    expect(data.value).toEqual('the new value');

    await SoftWareDataDB.delete('someRandomID');
})

it('can make a duplicate', async () => {
    const orgID = makeid();
    const dupID = makeid();
    await SoftWareDataDB.update(orgID, 'item1', 'item1 value');
    await SoftWareDataDB.update(orgID, 'item2', 'item2 value');
    await SoftWareDataDB.duplicate(orgID, dupID);

    const data = idObjToArr(await SoftWareDataDB.read(dupID));

    expect(data.length).toEqual(2);
    expect(data[0].value).toEqual('item1 value');
    expect(data[1].value).toEqual('item2 value');

    await SoftWareDataDB.delete(orgID);
    await SoftWareDataDB.delete(dupID);
})


it('can update delete db item', async () => {
    await SoftWareDataDB.update('anotherID', 'the title', 'the value')
    await SoftWareDataDB.delete('anotherID');

    const data = await SoftWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})