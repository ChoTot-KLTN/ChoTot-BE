const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");

const post = {
  title: DEFAULT_MODEL.stringRequire,
  content: DEFAULT_MODEL.stringRequire,
  image: DEFAULT_MODEL.array,
  idCategory: DEFAULT_MODEL.stringIdMongo,
  status: DEFAULT_MODEL.number,
  ratings: { ...DEFAULT_MODEL.number, default: 0 },
  idUserPoster: DEFAULT_MODEL.stringIdMongo,
  userInteractive: DEFAULT_MODEL.array,
  totalLike: { ...DEFAULT_MODEL.number, default: 0 },
  comments: DEFAULT_MODEL.array,
  isAdvertised: DEFAULT_MODEL.boolean,
  priceAdvert: DEFAULT_MODEL.number,
  dateStartAdvert: DEFAULT_MODEL.date,
  timeEndAdvert: DEFAULT_MODEL.date,
  isVehicleInspection: DEFAULT_MODEL.boolean,
  totalPrice: DEFAULT_MODEL.number,
  dateStartPoster: DEFAULT_MODEL.date,
  dateEndPoster: DEFAULT_MODEL.date,
};

module.exports = Post = mongoose.model("Post", createSchema(post));
