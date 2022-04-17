const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    _id: String,
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
