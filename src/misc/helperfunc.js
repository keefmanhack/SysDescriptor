import {Document, Packer, Paragraph, HeadingLevel, UnderlineType, TextRun, Table, TableRow, TableCell } from 'docx';
import {saveAs} from 'file-saver';

export function makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


export const arrRemove = (arr, item) =>{
    const i = arr.findIndex(item);
    if(i===-1){return arr}

    return arr.splice(i, 1);
}

export const generateId = () => (
    makeid(20)
)


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

export const snapToArr = snapArr => {
  const json = (snapArr) || {};
  const ids = Object.keys(json);
  const arr = ids.map(id =>  ({id, ...json[id]}));
  return arr || [];
}

export const generateDocument = () => {
  const doc = new Document({
    styles: {
      default: {
        heading1: {
            run: {
                size: convertSize(28),
                bold: true
            },
            paragraph: {
                spacing: {
                    after: 120,
                },
            },
        },
        heading2: {
            run: {
                size: convertSize(22),
                bold: true,
                underline: {
                    type: UnderlineType.SINGLE,
                },
            },
        },
        listParagraph: {
            run: {
                color: "#FF0000",
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
            size: convertSize(14)
        },
      }]
    },
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: "[System Name]",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [
            new TextRun("Generated On: "), new TextRun({text:"[Date]", bold: true}),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun("Technician: "), new TextRun({text:"[Tech]", bold: true}),
            new TextRun("Owner: "), new TextRun({text:"[Owner]", bold: true})
          ],
          style: "tech-owner"
        }),
        new Paragraph(""),
        new Paragraph({
          text: "ATC",
          heading: HeadingLevel.HEADING_2,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("")]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Part Number", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Build Date", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Build Number", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Board Number", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Rev Number", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Serial Number", bold: true})]})]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "MAIN", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph("[atc_main Part number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main Build Date] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main build number")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc_main Board Number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main Rev Number] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main Serial Number")]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Decoder", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph("[decoder Part number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[decoder Build Date] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[decoder build number")]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Tach I/O", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph("[Tach Part number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[Tach Build Date] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[Tach build number")]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "Cab Test", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph("[Cab Test Part number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[Cab test Build Date] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[Cab Test build number")]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children: [new TextRun({text: "MAIN", bold: true})]})]
                }),
                new TableCell({
                  children: [new Paragraph("[atc_main Part number]")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main Build Date] ")]
                }),
                new TableCell({
                  children: [new Paragraph("[atc main build number")]
                })
              ]
            })
          ]
        })
      ],
    }],
  });
  saveDocumentToFile(doc, "New Document.docx");
}





