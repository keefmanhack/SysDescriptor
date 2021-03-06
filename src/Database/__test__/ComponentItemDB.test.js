import { idObjToArr, makeid } from "../../misc/helperfunc";
import { ComponentItemDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB";
import { HardWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/HarwareDataDB";


it('Can create a component id', async () => {
    const id = `${makeid(5)}test`;

    await ComponentItemDB.create(id, 'component name');

    const data = await ComponentItemDB.read(id);

    expect(Object.keys(data).length).toEqual(1);

    await ComponentItemDB.delete(id);

})

it('Can make a duplicate', async () => {
    const id = `${makeid(5)}test`;
    const dupID = `${makeid(5)}test`;

    await ComponentItemDB.create(id, 'comp name');
    await ComponentItemDB.duplicate(id, dupID);

    const dupComp = idObjToArr(await ComponentItemDB.read(dupID));

    expect(dupComp[0].name).toEqual('comp name');


    await ComponentItemDB.delete(id);
    await ComponentItemDB.delete(dupID);
})


it('Can delete the component and all of its children', async () => {
    const id = `${makeid(5)}test`;

    const compID = await ComponentItemDB.create(id, 'component name');
    await HardWareDataDB.update(compID, 'data value', 'value title');

    await ComponentItemDB.delete(id);

    const hardwareData = await HardWareDataDB.read(compID);
    const component = await ComponentItemDB.read(id);

    expect(hardwareData).toEqual(null);
    expect(component).toEqual(null);
})


it('Can delete a specific component item', async () => {
    const compID = `${makeid(5)}test`;
    
    const compItemID = await ComponentItemDB.create(compID, 'component item name');

    await ComponentItemDB.deleteSpecific(compID, compItemID);

    const compItems = await ComponentItemDB.read(compID);

    expect(compItems).toEqual(null);

})