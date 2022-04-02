
const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postLaptop = {
    typePost: DEFAULT_MODEL.string,
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
    color: DEFAULT_MODEL.string,
    microprocessor: DEFAULT_MODEL.string,
    ram: DEFAULT_MODEL.string,
    hardDrive: DEFAULT_MODEL.string,
    typeHardDrive: DEFAULT_MODEL.string,
    graphicsCard: DEFAULT_MODEL.string,
    statusLaptop : DEFAULT_MODEL.string,
    guarantee: DEFAULT_MODEL.string,
    price: DEFAULT_MODEL.number,
    
};

module.exports = PostLaptop =  mongoose.model("PostLaptop", createSchema(postLaptop));