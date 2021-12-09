import { makeid } from "../../misc/helperfunc";
import { ComponentItemDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB";
import { HardWareDataDB } from "../SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/HarwareDataDB";


it('Can create a component id', async () => {
    const id = `${makeid(5)}test`;

    await ComponentItemDB.create(id, 'component name');

    const data = await ComponentItemDB.read(id);

    expect(Object.keys(data).length).toEqual(1);

    await ComponentItemDB.delete(id);

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