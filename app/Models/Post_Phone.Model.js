const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const postPhone = {
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
    ram: DEFAULT_MODEL.string,
    statusPhone : DEFAULT_MODEL.string,
    price: DEFAULT_MODEL.number,
    
};

module.exports = PostPhone =  mongoose.model("PostPhone", createSchema(postPhone));