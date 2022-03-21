const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postOffice = {
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
    nameOfBuilding: DEFAULT_MODEL.string,
    codeBuilding: DEFAULT_MODEL.string,
    block: DEFAULT_MODEL.string,
    floor: DEFAULT_MODEL.number,
    typeOffice: DEFAULT_MODEL.string,
    doorDirection: DEFAULT_MODEL.string,
    juridical: DEFAULT_MODEL.string,
    interiorCondition: DEFAULT_MODEL.string,
    area: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
};

module.exports = PostOffice = mongoose.model("PostOffice", createSchema(postOffice));