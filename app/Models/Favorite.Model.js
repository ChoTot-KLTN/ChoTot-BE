const { createSchema } = require("./Create.Model");
const { DEFAULT_MODEL } = require("../Common/Constants");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteSchema = {
  postId: {
    type: Schema.Types.ObjectId, ref: "Post"
  },
  idUser: DEFAULT_MODEL.stringIdMongo,
  isActive: DEFAULT_MODEL.boolean,
};
module.exports = Favorite = mongoose.model(
  "Favorite",
  createSchema(favoriteSchema)
);
