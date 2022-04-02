const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postBicycle = {
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
    brand: DEFAULT_MODEL.string,
    typeBicycle: DEFAULT_MODEL.string,
    engine: DEFAULT_MODEL.string,
    statusBicycle: DEFAULT_MODEL.string,
    guarantee: DEFAULT_MODEL.string,
    price: DEFAULT_MODEL.number,
};

module.exports = PostBicycle =  mongoose.model("PostBicycle", createSchema(postBicycle));