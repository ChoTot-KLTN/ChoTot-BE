const {Account, User} = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { generateString } = require("../Common/Helper");
const {sendOtp} = require("./Mail.Service")


const register = async (body)=>{
    try{
        const {name, email, phone, address, password} = body;
    const emailExist = await User.findOne({email:email});
    if(emailExist){
        return {
            success: false,
            message: {
              ENG: "Email already has been used",
              VN: "Email đã được sử dụng",
            },
            status: HTTP_STATUS_CODE.CONFLICT,
        };
    }
    const phoneExist = await User.findOne({phone:phone});
    if(phoneExist){
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
        username:email,
        password: hashedPassword,
        otp:otp,
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
    }catch(error){
        return {
            success: false,
            message: error.message,
            status: error.status,
          };
    }
};

const login = async (body)=>{
    const {email,password} = body;
    try {

        const account = await Account.findOne({username:email});
        if(!account){
            return {
                message: {
                  ENG: "Account or password is incorrect",
                  VN: "Tài khoản hoặc mật khẩu không chính xác",
                },
                success: false,
                status: HTTP_STATUS_CODE.FORBIDDEN,
              };
        }
        const isCorrectPassword = await bcrypt.compare(password,account.password);
        if(!isCorrectPassword){
            return{
                message:{
                    ENG:"Password is incorrect",
                    VN:"Sai mật khẩu",
                },
                success: false,
                status: HTTP_STATUS_CODE.NOT_FOUND
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
    }catch(error){
        return {
            success: false,
            message: error.message,
            status: error.status,
          };
    }
};

const verifydAccount =async (body)=>{
  try{
    const {email, otp} = body;
    const account = await Account.findOne({username:email});
    if(!account){
      return {
        success: false,
        message: {
          ENG: "Account not found",
          VN: "Tài khoản không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    if(account.otp === otp)
    {
      account.isVerified = true;
      account.otp = "";
      await account.save();
    }
    if(account.isVerified === true){
      return {
        data: "data",
        success: true,
        message: {
          ENG: "Your account is verified",
          VN: "Tài khoản của bạn đã được kích hoạt",
        },
        status: HTTP_STATUS_CODE.OK,
      }
    }
    return {
      success: false,
      message: {
        ENG: "Invalid otp",
        VN: "Mã otp không hợp đúng",
      },
      status: HTTP_STATUS_CODE.UNAUTHORIZED,
    };
  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

module.exports = {
    register,
    login,
    verifydAccount
}