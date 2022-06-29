const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {register, 
      login, 
      verifydAccount, 
      getOtp, 
      getAuth,
      forgotPassword,
      sendNewPassword,
      changePassword,
      loginWithPhone,
      loginPhoneOTP } = require("../Services/Auth.Service");

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

const handleGetOTP = async (req,res)=>{
  const result = await getOtp(req.query);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};

const handleGetAuth = async (req,res)=>{
  const token = req.body.token;
  const result = await getAuth(token.id);
  console.log(token.id);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};

const handleForgotPassword = async (req,res)=>{
  const result = await forgotPassword(req.body);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};

const handleSendNewPass = async (req,res)=>{
  const result = await sendNewPassword(req.body);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};
const handleChangePassword = async (req,res)=>{
  const { token, oldPassword, newPassword } = req.body;
  const result = await changePassword(token.id,oldPassword,newPassword);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
};

const handleLoginWithPhone = async (req,res)=>{
  const result = await loginWithPhone(req.body);
  if(result.success){
    return sendSuccess(res, result.data, result.message, result.status);
  }
  return sendError(res, result.message, result.status);
  
}

const handleLoginWithPhoneOTP = async (req,res)=>{
  
  const result = await loginPhoneOTP(req.body);
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


module.exports = {
    handleRegister,
    handleLogin,
    handleVerify,
    handleGetOTP,
    handleGetAuth,
    handleForgotPassword,
    handleSendNewPass,
    handleChangePassword,
    handleLoginWithPhone,
    handleLoginWithPhoneOTP
}