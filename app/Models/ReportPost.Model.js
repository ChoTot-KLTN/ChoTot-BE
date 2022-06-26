const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");
const Schema = mongoose.Schema;


const report = {
    idPost: DEFAULT_MODEL.stringRequire,
    idReporter: DEFAULT_MODEL.stringRequire,
    reason: DEFAULT_MODEL.stringRequire,
    nameReporter:DEFAULT_MODEL.stringRequire,
    avatar: DEFAULT_MODEL.stringRequire
};

module.exports = Report = mongoose.model("Report", createSchema(report));