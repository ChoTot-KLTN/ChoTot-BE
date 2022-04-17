const { createSchema } = require("./Create.Model");
const mongoose = require("mongoose");

const messageSchema = {
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
};
module.exports = Message = mongoose.model(
  "Message",
  createSchema(messageSchema)
);
