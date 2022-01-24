import { idObjToArr, makeid } from "../../misc/helperfunc";
import { ComponentItemDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB";
import { ComponentDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB";
it('Can create a sub id', async () => {
    const id = `${makeid(5)}test`;

    await ComponentDB.create(id, 'component name');

    const data = await ComponentDB.read(id);

    expect(Object.keys(data).length).toEqual(1);

    await ComponentDB.delete(id);

})

it('Can make a duplicate', async () => {
    const id = `${makeid(5)}test`;
    const dupID = `${makeid(5)}test`;

    await ComponentDB.create(id, 'comp name');
    await ComponentDB.duplicate(id, dupID);

    const dupComp = idObjToArr(await ComponentDB.read(dupID));

    expect(dupComp[0].name).toEqual('comp name');


    await ComponentDB.delete(id);
    await ComponentDB.delete(dupID);
})

it('Can delete the component and all of its children', async () => {
    const id = `${makeid(5)}test`;

    const compID = await ComponentDB.create(id, 'component name');
    await ComponentItemDB.create(compID, 'component item name');

    await ComponentDB.delete(id);

    const componentItem = await ComponentItemDB.read(compID);
    const component = await ComponentDB.read(id);

    expect(componentItem).toEqual(null);
    expect(component).toEqual(null);
})