const generateString = (length, containNaN) => {
    let result = "";
    let characters = "0123456789";
    if (containNaN) {
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      result = "0";
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  const mapToRegexExactly = (object) => {
    Object.keys(object).map((key) => {
      object[key] = new RegExp("^" + object[key] + "$", "i");
    });
    return object;
  };
  
  const mapToRegexContains = (object) => {
    Object.keys(object).map((key) => {
      object[key] = new RegExp(object[key], "i");
    });
    return object;
  };
  
  const mapToRegexContainMongoDbQuery = (query, data) => {
    const obj = {};
    if (data) {
      Object.keys(query).map((key) => {
        obj[`${data}.${key}`] = { $regex: query[key], $options: "i" };
      });
      return obj;
    }
    Object.keys(query).map((key) => {
      obj[`${key}`] = { $regex: query[key], $options: "i" };
    });
    return obj;
  };
  
  const convertObjToArrayProps = (obj) => {
    const arr = [];
    Object.keys(obj).map((key) => {
      arr.push({ [key]: obj[key] });
    });
    return arr;
  };
  
  module.exports = {
    convertObjToArrayProps,
    generateString,
    mapToRegexContains,
    mapToRegexExactly,
    mapToRegexContainMongoDbQuery,
  };
  