const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {register, login, verifydAccount} = require("../Services/Auth.Service");

const handleRegister = async (req, res) => {
    const result = await register(req.body);
    if (result.success)
      return sendSuccess(res, result.data, result.message, result.status);
    return sendError(res, result.message, result.status);
  };

const handleLogin = async (req,res)=>{
  const result = await login(req.body);
  if(result.success){
    const accessToken = encodedToken(result.data.idUser);
    const role = result.data.role;
    res.setHeader("Authorization", accessToken);
    return sendSuccess(
      res,
      { accessToken: accessToken, role: role },
      result.message,
      result.status
    );
  }
  return sendError(res, result.message, result.status);
}

const handleVerify = async (req,res)=>{
  const result = await verifydAccount(req.body);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};

module.exports = {
    handleRegister,
    handleLogin,
    handleVerify
}