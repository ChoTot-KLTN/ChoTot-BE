const {createSchema} = require('./Create.Model');
const mongoose = require("mongoose");
const { DEFAULT_MODEL }  = require("../Common/Constants");

const user = {
    name : DEFAULT_MODEL.stringRequire,
    email: DEFAULT_MODEL.stringEmail,
    phone:DEFAULT_MODEL.stringPhone,
    address: {
        type: {
          detail: DEFAULT_MODEL.string,
          village: DEFAULT_MODEL.string,
          district: DEFAULT_MODEL.string,
          province: DEFAULT_MODEL.string,
        },
        default: {},
      },
    ratings: { ...DEFAULT_MODEL.number, default: 0 },
    posts: { ...DEFAULT_MODEL.number, default: 0 },
    avatar:{type: String, default: "nope"}
};

module.exports = User = mongoose.model("User",createSchema(user));