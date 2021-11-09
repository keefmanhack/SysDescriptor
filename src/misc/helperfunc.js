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


// function editDistance(s1, s2) {
//     s1 = s1.toLowerCase();
//     s2 = s2.toLowerCase();
  
//     const costs = [];
//     for (let i = 0; i <= s1.length; i++) {
//       let lastValue = i;
//       for (let j = 0; j <= s2.length; j++) {
//         if (i === 0)
//           costs[j] = j;
//         else if(j> 0) {
//             let newValue = costs[j - 1];
//             if (s1.charAt(i - 1) !== s2.charAt(j - 1))
//                 newValue = Math.min(Math.min(newValue, lastValue),
//                 costs[j]) + 1;
//             costs[j - 1] = lastValue;
//             lastValue = newValue;
//         }
//       }
//       if (i > 0)
//         costs[s2.length] = lastValue;
//     }
//     return costs[s2.length];
//   }



export function filterList(sysArr, searchString) {
    const filtered = sysArr.filter(str => {
      if(!str){return false}
      return str.includes(searchString);
    });
    return filtered;
  }



