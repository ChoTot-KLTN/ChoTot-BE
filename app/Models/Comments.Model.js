const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = {
  postId: {
    type: String,
  },
  // idUserComment: { type: String, default: null },
  idUserComment: { type: Schema.Types.ObjectId, ref: "User"},
  text: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
};
module.exports = Comments = mongoose.model(
  "Comments",
  createSchema(commentsSchema)
);
