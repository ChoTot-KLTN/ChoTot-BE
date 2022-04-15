const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");


// Này là bài poster cho chung cư
const postApartment={
    typePost: DEFAULT_MODEL.string,
    type : DEFAULT_MODEL.string,
    nameOfBuilding: DEFAULT_MODEL.string,
    address: {
        type: {
          detail: DEFAULT_MODEL.string,
          village: DEFAULT_MODEL.string,
          district: DEFAULT_MODEL.string,
          province: DEFAULT_MODEL.string,
        },
        default: {},
      },
    codeBuilding: DEFAULT_MODEL.string,
    block: DEFAULT_MODEL.string,
    floor: DEFAULT_MODEL.number,
    typeBuilding: DEFAULT_MODEL.string,
    numberOfBedroom: DEFAULT_MODEL.stringNum,
    numberOfBathroom: DEFAULT_MODEL.stringNum,
    balconyDirection: DEFAULT_MODEL.string,
    doorDirection: DEFAULT_MODEL.string,
    juridical: DEFAULT_MODEL.string,
    InteriorCondition: DEFAULT_MODEL.string,
    area: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
};

module.exports = PostApartment = mongoose.model("PostApartment",createSchema(postApartment));