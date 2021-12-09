import { ComponentDB } from "../ComponentDB"

it('Can create a component id', async () => {
    await ComponentDB.create('someID');

    const data = await ComponentDB.read('someID');

    expect(Object.keys(data).length()).toEqual(1);

})

it('Can delete the component and all of its children', async () => {

})