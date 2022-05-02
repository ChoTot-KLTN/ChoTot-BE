
const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {getAllUser, lockUser,updateStatusPost} = require("../Services/Admin.Service");

const handleGetAllUser = async (req, res) => {
    const result = await getAllUser(req.query);
    if (result.success)
      return sendSuccess(res, result.data, result.message, result.status);
    return sendError(res, result.message, result.status);
};
const handleBlockUser = async (req, res) => {
  const result = await lockUser(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleChangeStatusPost = async (req, res) => {
  const result = await updateStatusPost(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
module.exports={
    handleGetAllUser,
    handleBlockUser,
    handleChangeStatusPost,
};