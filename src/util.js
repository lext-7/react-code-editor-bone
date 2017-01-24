export const pick = (obj, keys) => {
    const newObj = {};
    keys.forEach((key) => {
        newObj[key] = obj[key];
    });
    return newObj;
};
