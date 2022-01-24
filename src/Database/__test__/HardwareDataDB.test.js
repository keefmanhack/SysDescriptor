import { idObjToArr, makeid } from "../../misc/helperfunc";
import { HardWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/HarwareDataDB";

it('can update db', async () => {
    await HardWareDataDB.update('someRandomID', 'the title', 'the new value')

    const data = await HardWareDataDB.readSpecific('someRandomID', 'the title');

    expect(data.value).toEqual('the new value');

    await HardWareDataDB.delete('someRandomID');
})

it('can make a duplicate', async () => {
    const orgID = makeid();
    const dupID = makeid();
    await HardWareDataDB.update(orgID, 'item1', 'item1 value');
    await HardWareDataDB.update(orgID, 'item2', 'item2 value');
    await HardWareDataDB.duplicate(orgID, dupID);

    const data = idObjToArr(await HardWareDataDB.read(dupID));

    expect(data.length).toEqual(2);
    expect(data[0].value).toEqual('item1 value');
    expect(data[1].value).toEqual('item2 value');

    await HardWareDataDB.delete(orgID);
    await HardWareDataDB.delete(dupID);
})

it('can update delete db item', async () => {
    await HardWareDataDB.update('anotherID', 'the title', 'the new value')
    await HardWareDataDB.delete('anotherID');

    const data = await HardWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})