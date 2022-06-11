const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");
const Schema = mongoose.Schema;


const rating = {
    idOwner: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    avgRate: DEFAULT_MODEL.array,
    count : DEFAULT_MODEL.number,
};

module.exports = Rating = mongoose.model("Rating", createSchema(rating));