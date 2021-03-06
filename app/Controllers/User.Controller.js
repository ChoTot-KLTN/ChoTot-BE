const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const { updateInfo,getUserByID } = require("../Services/User.Service");

const handleUpdateInfo = async (req, res) => {
  // console.log(req.body);
  const result = await updateInfo(req.body.token.id, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const handleGetUserInfor = async (req, res) => {
  // console.log(req.body);
  const result = await getUserByID(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

module.exports = {
  handleUpdateInfo,
  handleGetUserInfor,
};
