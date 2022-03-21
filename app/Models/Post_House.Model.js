
const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postHouse = {
    typePost: DEFAULT_MODEL.string,
    type : DEFAULT_MODEL.string,
    address: {
        type: {
          detail: DEFAULT_MODEL.string,
          village: DEFAULT_MODEL.string,
          district: DEFAULT_MODEL.string,
          province: DEFAULT_MODEL.string,
        },
        default: {},
      },
    codeHouse: DEFAULT_MODEL.string,
    block: DEFAULT_MODEL.string,
    typeHouse: DEFAULT_MODEL.string,
    numberOfBedroom: DEFAULT_MODEL.number,
    numberOfBathroom: DEFAULT_MODEL.number,
    numberOfFloor: DEFAULT_MODEL.number,
    doorDirection: DEFAULT_MODEL.string,
    juridical: DEFAULT_MODEL.string,
    InteriorCondition: DEFAULT_MODEL.string,
    area: DEFAULT_MODEL.number,
    height: DEFAULT_MODEL.number,
    width: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
};

module.exports = PostHouse = mongoose.model("Posthouse", createSchema(postHouse));