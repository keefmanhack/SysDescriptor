export const arrRemove = (arr, search) =>{
    const i = arr.findIndex(item);
    if(i===-1){return arr}

    return arr.splice(i, 1);
}