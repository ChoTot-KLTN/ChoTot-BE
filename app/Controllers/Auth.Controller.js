const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {register} = require("../Services/Auth.Service");

const handleRegister = async (req, res) => {
    const result = await register(req.body);
    if (result.success)
      return sendSuccess(res, result.data, result.message, result.status);
    return sendError(res, result.message, result.status);
  };

module.exports = {
    handleRegister,
}