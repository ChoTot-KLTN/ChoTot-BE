const { sendError, sendSuccess } = require("./Controller");
const Message = require("../Services/Message.Service");

const createMessage = async (req, res) => {
  // console.log(req.body);
  const result = await Message.createMessage(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const getMessage = async (req, res) => {
  // console.log(req.body);
  const result = await Message.getMessage(req.params.conversationId);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

module.exports = {
  createMessage,
  getMessage,
};
