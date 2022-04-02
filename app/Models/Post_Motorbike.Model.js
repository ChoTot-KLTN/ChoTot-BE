const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postMotorbike = {
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
    yearOfRegistration: DEFAULT_MODEL.number,
    typeMotorbike: DEFAULT_MODEL.string,
    capacity: DEFAULT_MODEL.string,
    statusMotorbike: DEFAULT_MODEL.string,
    numberOfKm: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
};

module.exports = PostMotorbike =  mongoose.model("PostMotorbike", createSchema(postMotorbike));