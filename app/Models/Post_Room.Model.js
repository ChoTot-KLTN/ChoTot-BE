
const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postMotelRoom = {
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
    interiorCondition: DEFAULT_MODEL.string,
    area: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
    deposit: DEFAULT_MODEL.number,
};

module.exports = PostMotelRoom =  mongoose.model("PostMotelRoom", createSchema(postMotelRoom));