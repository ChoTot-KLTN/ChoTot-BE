const {createSchema} = require('./Create.Model');
const mongoose = require("mongoose");
const { DEFAULT_MODEL,STATUS }  = require("../Common/Constants");

const account = {
    username: DEFAULT_MODEL.stringUnique,
    password: DEFAULT_MODEL.stringRequire,
    isVerified: DEFAULT_MODEL.booleanFalse,
    otp: DEFAULT_MODEL.stringOtp,
    role: DEFAULT_MODEL.string,
    idUser:{type:String, required:true, ref:"User"},
    status: { ...DEFAULT_MODEL.stringRequire, default: STATUS.ACTIVE },
};

module.exports = Account = mongoose.model("Account",createSchema(account));