const { sendError, sendSuccess } = require("./Controller");
const Conversation = require("../Services/Conversation.Service");

const creatConversation = async (req, res) => {
  // console.log(req.body);
  const result = await Conversation.createConversation(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const getConversation = async (req, res) => {
  // console.log(req.body);
  const result = await Conversation.getConversation([req.params.userId]);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

module.exports = {
  creatConversation,
  getConversation,
};
