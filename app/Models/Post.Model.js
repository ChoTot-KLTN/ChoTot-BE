const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const { DEFAULT_MODEL } = require("../Common/Constants");
const Schema = mongoose.Schema;


// status của post:
// - 0 Đợi duyệt
// - 1 Từ chối
// - 2 Thanh toán
// - 3 Đang hiển thị
// - 4 Hủy
// - 5 Hết hạn
const post = {
  title: DEFAULT_MODEL.stringRequire,
  content: DEFAULT_MODEL.stringRequire,
  image: DEFAULT_MODEL.array,
  //idCategory: DEFAULT_MODEL.stringIdMongo,
  typePost:DEFAULT_MODEL.string ,
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['PostApartment', 'PostHouse', 'PostGround', 'PostOffice', 'PostMotelRoom', 
    'PostCar', 'PostMotorbike', 'PostBicycle', 'PostLaptop', 'PostPhone']
  },
  status: DEFAULT_MODEL.number,
  ratings: { ...DEFAULT_MODEL.number, default: 0 },
  idUserPost: DEFAULT_MODEL.stringIdMongo,
  userInteractive: DEFAULT_MODEL.array,
  totalLike: { ...DEFAULT_MODEL.number, default: 0 },
  comments: DEFAULT_MODEL.array,
  isAdvertised: DEFAULT_MODEL.booleanFalse,
  priceAdvert: DEFAULT_MODEL.number,
  dateStartAdvert: DEFAULT_MODEL.date,
  timeEndAdvert: DEFAULT_MODEL.date,
  // isVehicleInspection: DEFAULT_MODEL.boolean,
  totalPrice: DEFAULT_MODEL.number,
  dateStartPost: DEFAULT_MODEL.date,
  dateEndPost: DEFAULT_MODEL.date,
  prePrice: DEFAULT_MODEL.number,
  province: DEFAULT_MODEL.string,
  nameOfPoster: DEFAULT_MODEL.string,
  phoneOfPoster:DEFAULT_MODEL.stringPhone,
  avatarOfPoster:{type: String, default: "nope"}
};

module.exports = Post = mongoose.model("Post", createSchema(post));
