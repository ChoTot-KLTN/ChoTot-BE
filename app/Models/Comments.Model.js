const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");

const commentsSchema = {
  postId: {
    type: String,
  },
  idUserComment: { type: String, default: null },
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
