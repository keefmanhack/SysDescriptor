import { HardWareDataDB } from "../Data/HarwareDataDB";


it('can update db', async () => {
    await HardWareDataDB.update('someRandomID', 'the new value', 'the title')

    const data = await HardWareDataDB.read('someRandomID');

    expect(data.value).toEqual('the new value');
    expect(data.title).toEqual('the title');

    await HardWareDataDB.delete('someRandomID');
})

it('can update delete db item', async () => {
    await HardWareDataDB.update('anotherID', 'the new value', 'the title')
    await HardWareDataDB.delete('anotherID');

    const data = await HardWareDataDB.read('anotherID');

    expect(data).toEqual(null);

})