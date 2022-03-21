const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postCar = {
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
    yearOfManufacture: DEFAULT_MODEL.number,
    carGearbox: DEFAULT_MODEL.string,
    fuel: DEFAULT_MODEL.string,
    numberOfSeat: DEFAULT_MODEL.number,
    color: DEFAULT_MODEL.string,
    statusCar: DEFAULT_MODEL.string,
    numberOfKm: DEFAULT_MODEL.number,
    price: DEFAULT_MODEL.number,
};

module.exports = PostCar =  mongoose.model("PostCar", createSchema(postCar));