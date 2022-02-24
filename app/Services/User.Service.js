const { User } = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");

const updateInfo = async (userId, body) => {
  try {
    const user = await User.findById(userId);
    console.log(userId);
    if (!user) {
      return {
        success: false,
        message: {
          ENG: "Account not found",
          VN: "Tài khoản không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    Object.assign(user, body);
    await user.save();
    return {
      success: true,
      message: {
        ENG: "Account updated",
        VN: "Cập nhật thành công",
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

module.exports = {
  updateInfo,
};
