const { sendError, sendSuccess } = require("./Controller");
const Comments = require("../Services/Comments.Service");

const createComments = async (req, res) => {
  const token = req.body.token.id;
  // console.log(req.body);
  const result = await Comments.createComments(req.body, token);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const getComments = async (req, res) => {
  // console.log(req.body);
  const result = await Comments.getComments(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const updateComments = async (req, res) => {
  // console.log(req.body);
  const result = await Comments.updateComments(req.params.commentId, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const deleteComments = async (req, res) => {
  // console.log(req.body);
  const token = req.body.token.id;
  const result = await Comments.deleteComments(token,req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

module.exports = {
  createComments,
  getComments,
  updateComments,
  deleteComments,
};
