const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");
const Schema = mongoose.Schema;

const revenue = {
    idPost: DEFAULT_MODEL.stringRequire,
    priceAdvert: DEFAULT_MODEL.number,
    dateStartAdvert: DEFAULT_MODEL.date,
    monthStart : DEFAULT_MODEL.number,
    yearStart: DEFAULT_MODEL.number,
};

module.exports = Revenue = mongoose.model("Revenue", createSchema(revenue));