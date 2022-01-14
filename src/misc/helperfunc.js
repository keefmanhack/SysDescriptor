import {Document, Packer, Paragraph, HeadingLevel, UnderlineType, TextRun, Table, TableRow, TableCell } from 'docx';
import {saveAs} from 'file-saver';
import { RevisionDB } from '../Database/SystemDB/RevisionDB/RevisionDB';
import { ComponentDB } from '../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import { ComponentItemDB } from '../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB';
import { HardWareDataDB } from '../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/HarwareDataDB';
import { SoftWareDataDB } from '../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB';
import { SubSystemDB } from '../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';
import { SystemDB } from '../Database/SystemDB/SystemDB';
import Alert from './Alert';

export function makeid(length=5) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return `${Date.now()}${result}`;
}

export const dispTime = d => {
  if(Number.isNaN(d)){return '- -'}

  return (new Date(d)).toDateString();  

}

export const idObjToArr = obj => {
  if(!obj){return []}
  
  const ids = Object.keys(obj);

  return ids.map(id => {
    return {id, ...obj[id]}
  })
}

export const arrRemove = (arr, item) =>{
    const i = arr.findIndex(item);
    if(i===-1){return arr}

    return arr.splice(i, 1);
}

export function filterList(sysArr, searchString) {
  const filtered = sysArr.filter(str => {
    if(!str){return false}
    return str.includes(searchString);
  });
  return filtered;
}

const saveDocumentToFile = (doc, fileName) => {
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, fileName);
  });
}

const convertSize = x => (x*2)



// const hasValue = e => { //  eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": false }]
//   if(Object.entries(e).contains("value")){
//     return !(e.value==='')
//   }
//   if(Object.entries(e).length > 0){
//     const entries = Object.entries(e);
//     for(let i =0 ; i<entries.length; i++){
//       hasValue(e[entries[i]]);
//     }
//   }else{
//     return false
//   }
// }

// const getOptionalValues = optionsArr => {
//   const arr = [];

//   for(let i =0; i< optionsArr.length; i++){
//     if(hasValue(optionsArr[i])){
//       arr.push(optionsArr[i]);
//     }
//   }

//   return arr;
// }

// const buildTable = jsonDoc => {
//   const dataToDisplay = [...jsonDoc.required, ...getOptionalValues()]
// }

export const getKeyName = obj => {
  return Object.keys(obj)[0];
}

export const snapToArr = snapArr => {
  const json = (snapArr) || {};
  const ids = Object.keys(json);
  const arr = ids.map(id =>  ({id, ...json[id]}));
  return arr || [];
}


const dispHardSoftData = (hardData, softData) => {
  const loopLen = hardData.length > softData.length ? hardData.length : softData.length;

  const returnVar = [];

  for(let i =0; i< loopLen; i++){
    returnVar.push(
      new TableRow({
        children: [
          softData[i] ?
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun(`${softData[i].id}:  ${softData[i].value}`)
                ],
                style: 'default'
              }),
            ],
          }) : new TableCell({children:[]}),
        hardData[i] ?
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun(`${hardData[i].id}:  ${hardData[i].value}`)
                ],
                style: 'default'
              }),
            ],
          }) : new TableCell({children:[]}),
        ]
      })
    )
  }

  return returnVar;
}



const dispComponentItemData = async compItems => {
  const returnvar = [];
  for(let i =0; i< compItems.length; i++){
    const item = compItems[i];
    /* eslint-disable no-await-in-loop */
    const snObj = await HardWareDataDB.readSpecific(item.id, 'Serial Number');
    
    /* eslint-disable no-await-in-loop */
    const hardData = idObjToArr(await HardWareDataDB.read(item.id));
    /* eslint-disable no-await-in-loop */
    const softData = idObjToArr(await SoftWareDataDB.read(item.id));

    returnvar.push(
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun(`SN: ${snObj.value}`)
                    ],
                    style: 'default-bold',
                    
                  }),
                ],
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun("Hardware")
                    ],
                    style: 'default-bold',

                  }),
                ],
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun("Software")
                    ],
                    style: 'default-bold'
                  }),
                ],
              })
            ]
          }),
          ...await dispHardSoftData(hardData, softData)
        ]
      }),
    )
  }
  return returnvar;
}

const dispComponenetData = async comps => {
  const returnvar = [];
  for(let i =0; i< comps.length; i++){
    const comp = comps[i];
    /* eslint-disable no-await-in-loop */
    const compItems = idObjToArr(await ComponentItemDB.read(comp.id));

    returnvar.push(
      new Paragraph({
        text: comp.name,
        heading: HeadingLevel.HEADING_3,
      }),
      ...await dispComponentItemData(compItems)
    )
  }

  return returnvar;
}

const dispSubSystemData = async data => {
  const returnvar = [];

  for(let i =0; i< data.length; i++){
    const subSys = data[i];
    /* eslint-disable no-await-in-loop */
    const components = idObjToArr(await ComponentDB.read(subSys.id));

    returnvar.push(
      new Paragraph({
        text: subSys.name,
        heading: HeadingLevel.HEADING_2,
      }),
      ...await dispComponenetData(components)
    )

  }
  return returnvar;
}

export const generateDocument = async (SYSID, REVID) => {
  try{
    const date = new Date();

    const system = await SystemDB.read(SYSID);
    const revision = await RevisionDB.readSpecific(SYSID, REVID);
    const subsystems =  idObjToArr(await SubSystemDB.read(REVID));
    const doc = new Document({
      styles: {
        default: {
          heading1: {
              run: {
                  size: convertSize(28),
                  bold: true,
                  color: "FFFFFF"
              },
              paragraph: {
                  spacing: {
                      after: 120,
                  },
                  run: {
                    color: "FFFFFF"
                  }
              },
          },
          heading2: {
              run: {
                size: convertSize(22),
                bold: true,
                underline: {
                    type: UnderlineType.SINGLE,
                },
                color: "FFFFFF",
              },
              paragraph: {
                spacing: {
                  after: 100,
                }
              }
          },
          heading3: {
            run: {
              size: convertSize(16),
              bold: true,
              color: "FFFFFF",
            },
            paragraph: {
              spacing: {
                after: 50,
              }
            }
        },
          listParagraph: {
              run: {
                  color: "FF0000",
              },
          },
        },
        paragraphStyles: [
        {
          id: "tech-owner",
          name: "Technician & Owner",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
              size: convertSize(14),
              color: "FFFFFF"
          },
          paragraph: {
            spacing: {
              before: 100,
            }
          }
        },
        {
          id: "default",
          name: "default",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
              size: convertSize(10),
              color: "FFFFFF"
          },
        },
        {
          id: "default-bold",
          name: "default-bold",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
              size: convertSize(10),
              color: "FFFFFF",
              bold: true
          },
        }
      ],
      },
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: `${system.title} -- ${revision.name}`,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun("Generated On: "), new TextRun({text: `${date.toDateString()} ${date.toLocaleTimeString()}`, bold: true}),
            ],
            style: 'default'
          }),
          new Paragraph({
            children: [
              new TextRun("Technician: "), new TextRun({text: system.technician, bold: true}),
              new TextRun("Owner: "), new TextRun({text: system.owner, bold: true})
            ],
            style: "tech-owner"
          }),
          new Paragraph(""),
          ... await dispSubSystemData(subsystems)
        ],
      }],
    });
    saveDocumentToFile(doc, "New Document.docx");
  }catch(err){
    Alert.error('Unable to generate the document');
  }
}





