export const MesclarArrays = (array1:any[], array2:any[], key:any) => {
    const map = new Map();
    array1.forEach(item => map.set(item[key], item));
    array2.forEach(item => map.set(item[key], item));
    return Array.from(map.values());
  };
  
  export const filterArrayByKey = (array:any[], key:any) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
  };