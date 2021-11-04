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

