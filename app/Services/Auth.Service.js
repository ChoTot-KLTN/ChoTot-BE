const { Account, User } = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { generateString } = require("../Common/Helper");
const { sendOtp,sendPassword } = require("./Mail.Service");

const register = async (body) => {
  try {
    const { name, email, phone, address, password } = body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return {
        success: false,
        message: {
          ENG: "Email already has been used",
          VN: "Email đã được sử dụng",
        },
        status: HTTP_STATUS_CODE.CONFLICT,
      };
    }
    const phoneExist = await User.findOne({ phone: phone });
    if (phoneExist) {
      return {
        success: false,
        message: {
          ENG: "Phone already has been used",
          VN: "Phone đã được sử dụng",
        },
        status: HTTP_STATUS_CODE.CONFLICT,
      };
    }
    // Mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateString(4, false);
    await sendOtp(email, otp);
    const newUser = new User({
      name,
      email,
      phone,
      address,
    });
    const newAccount = new Account({
      username: email,
      password: hashedPassword,
      otp: otp,
      role: ROLE.USER,
      idUser: newUser._id,
    });
    await newUser.save();
    await newAccount.save();
    return {
      data: "data",
      success: true,
      message: {
        ENG: "Register successfully. Please verify your account. A verify code has been sent to your email",
        VN: "Đăng ký thành công. Hãy kích hoạt tài khoản của bạn. Một mã otp đã được gửi đến email của bạn",
      },
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const login = async (body) => {
  const { email, password } = body;
  try {
    const account = await Account.findOne({ username: email });
    if (!account) {
      return {
        message: {
          ENG: "Account or password is incorrect",
          VN: "Tài khoản hoặc mật khẩu không chính xác",
        },
        success: false,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };
    }
    const isCorrectPassword = await bcrypt.compare(password, account.password);
    if (!isCorrectPassword) {
      return {
        message: {
          ENG: "Password is incorrect",
          VN: "Sai mật khẩu",
        },
        success: false,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    if (account.isVerified === false) {
      const otp = await generateString(4, false);
      await sendOtp(account.username, otp);
      account.otp = otp;
      await account.save();
      return {
        message: {
          ENG: "Please verify your account. A verify code has been sent to your email",
          VN: "Hãy kích hoạt tài khoản của bạn. Một mã otp đã được gửi đến email của bạn",
        },
        success: false,
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
      };
    }
    return {
      message: {
        ENG: "Login Successfully",
        VN: "Đăng nhập thành công",
      },
      data: {
        idUser: account.idUser,
        role: account.role,
      },
      success: true,
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const verifydAccount = async (body) => {
  try {
    const { email, otp } = body;
    const account = await Account.findOne({ username: email });
    if (!account) {
      return {
        success: false,
        message: {
          ENG: "Account not found",
          VN: "Tài khoản không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    if (account.otp === otp) {
      account.isVerified = true;
      account.otp = "";
      await account.save();
    }
    if (account.isVerified === true) {
      return {
        data: "data",
        success: true,
        message: {
          ENG: "Your account is verified",
          VN: "Tài khoản của bạn đã được kích hoạt",
        },
        status: HTTP_STATUS_CODE.OK,
      };
    }
    return {
      success: false,
      message: {
        ENG: "Invalid otp",
        VN: "Mã otp không hợp đúng",
      },
      status: HTTP_STATUS_CODE.UNAUTHORIZED,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const getOtp = async (query) => {
  try {
    // const {email}=body;
    const userRegister = await Account.findOne({ username: query.email });
    console.log(query.email);
    if (!userRegister) {
      return {
        success: false,
        message: {
          ENG: "User not found",
          VN: "User không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    return {
      success: true,
      message: {
        ENG: "OTP",
        VN: "Mã OTP của người dùng",
      },
      data: userRegister.otp,
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const getAuth = async (idUser) => {
  try {
    const account = await Account.findOne({ idUser }).populate("idUser");
    if (!account) {
      return {
        success: false,
        message: {
          ENG: "don't find account",
          VN: "Không tìm được tài khoản",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: {
        ENG: "Get Auth successfully",
        VN: "Lấy thông tin người dùng thành công",
      },
      data: {
        user: account.idUser,
        role: account.role,
      },
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const forgotPassword =async (body)=> {
  try {
    const {email} = body;
    const account = await Account.findOne({username: email});
    if(!account){
      return {
          success: false,
          message: {
            ENG: "can't send otp, please check your email",
            VN: "không gửi được email, vui lòng kiểm tra tài khoản",
          },
          status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    const otp = await generateString(4, false);
    account.otp = otp;
    await account.save();
    await sendOtp(email, otp);
    return{
      success: true,
      message:{
        ENG:"Check OTP",
        VN:"Nhập mã otp được gửi qua email"
      },
      status:HTTP_STATUS_CODE.OK
    }

  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const sendNewPassword = async(body)=>{
  try {
      const{email, otp} = body;
      const account = await Account.findOne({username:email});
      if(!account){
        return {
          success: false,
          message: {
            ENG: "can't find account",
            VN: "Không tìm được tài khoản",
          },
          status: HTTP_STATUS_CODE.UNAUTHORIZED,
        };
      }
      if(account.otp != otp){
        return {
          success: false,
          message:{
            ENG:"Invalid OTP",
            VN:"Mã OTP không hợp lệ"
          },
          status:HTTP_STATUS_CODE.FORBIDDEN
        }
      }
      const randomPassword = await generateString(8,true);
      await sendPassword(email,randomPassword);
      const hashPass = await bcrypt.hash(randomPassword,10);
      account.password = hashPass;
      account.otp="";
      await account.save();
      return {
        success: true,
        message:{
          ENG:"Resend password successfully",
          VN:"Mật khẩu mới được gửi thành công",
        },
        status: HTTP_STATUS_CODE.OK
      };

    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
};

const changePassword = async (idUser, oldPassword, newPassword)=>{
  try{
    
    const account = await Account.findOne({idUser:idUser});
    if(!account){
      return {
        success: false,
        message: {
          ENG: "can't find account",
          VN: "Không tìm được tài khoản",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    const isCorrectPassword = await bcrypt.compare(oldPassword,account.password);
    if(!isCorrectPassword){
      return {
        success:false,
        message:{
          ENG:"Password incorrect",
          VN:"Sai mật khẩu"
        },
        status:HTTP_STATUS_CODE.FORBIDDEN
      };
    }
    const newPassHash = await bcrypt.hash(newPassword,10);
    account.password = newPassHash;
    account.save();
    return {
      success:true,
      message:{
        ENG:"Change word successfully",
        VN:"Đổi mật khẩu thành công",
      },
      status:HTTP_STATUS_CODE.OK
    };
    
  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
}

module.exports = {
  register,
  login,
  verifydAccount,
  getOtp,
  getAuth,
  forgotPassword,
  sendNewPassword,
  changePassword
};
