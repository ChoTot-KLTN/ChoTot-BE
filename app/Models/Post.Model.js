const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");
const Schema = mongoose.Schema;

const post = {
  title: DEFAULT_MODEL.stringRequire,
  content: DEFAULT_MODEL.stringRequire,
  image: DEFAULT_MODEL.array,
  idCategory: DEFAULT_MODEL.stringIdMongo,
  typePost:DEFAULT_MODEL.string ,
  idPosterApartment: {type:String, ref: "PostApartment",  default:""}, // ref: "PostApartment",
  idPosterHouse: {type:String,ref: "Posthouse", default: ""}, //  ref: "Posthouse",
  idPosterGround: DEFAULT_MODEL.string,
  idPosterOffice: DEFAULT_MODEL.string,
  idPosterMotelRoom: DEFAULT_MODEL.string,
  idPosterCar: DEFAULT_MODEL.string,
  idPosterMotorBike: DEFAULT_MODEL.string,
  idPosterElectricBicycle: DEFAULT_MODEL.string,
  idPosterPhone: DEFAULT_MODEL.string,
  idPosterlaptop: DEFAULT_MODEL.string,
  status: DEFAULT_MODEL.number,
  ratings: { ...DEFAULT_MODEL.number, default: 0 },
  idUserPost: DEFAULT_MODEL.stringIdMongo,
  userInteractive: DEFAULT_MODEL.array,
  totalLike: { ...DEFAULT_MODEL.number, default: 0 },
  comments: DEFAULT_MODEL.array,
  isAdvertised: DEFAULT_MODEL.boolean,
  priceAdvert: DEFAULT_MODEL.number,
  dateStartAdvert: DEFAULT_MODEL.date,
  timeEndAdvert: DEFAULT_MODEL.date,
  // isVehicleInspection: DEFAULT_MODEL.boolean,
  totalPrice: DEFAULT_MODEL.number,
  dateStartPoster: DEFAULT_MODEL.date,
  dateEndPoster: DEFAULT_MODEL.date,
};

module.exports = Post = mongoose.model("Post", createSchema(post));
