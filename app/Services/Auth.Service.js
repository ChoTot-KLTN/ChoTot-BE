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

module.exports = {
    register
}