const {sendMail} = require("../Common/Mailer");
const { HTTP_STATUS_CODE } = require("../Common/Constants");

const sendOtp = async (email, otp) => {
    try {
      const body =
        "Chào mừng bạn đến với ChoTotHD, đây là mã xác thực của bạn: " + otp;
      await sendMail(email, "Mã xác thực tài khoản", body);
  
      return {
        message: "Verify code has been sent",
        data: "",
        success: true,
        status: HTTP_STATUS_CODE.OK,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        status: error.status,
      };
    }
  }; //done

  module.exports={
      sendOtp
  }