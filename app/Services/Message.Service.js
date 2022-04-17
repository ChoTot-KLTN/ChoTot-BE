const { Message } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { send } = require("express/lib/response");

const createMessage = async (body) => {
  try {
    const message = await Message.create(body);
    if (message) {
      return {
        data: message,
        success: true,
        message: {
          ENG: "Message created",
          VN: "Tao thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      };
    }
    return {
      success: false,
      message: {
        ENG: "Failed",
        VN: "That bai",
      },
      status: HTTP_STATUS_CODE.BAD_REQUEST,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const getMessage = async (data) => {
  try {
    const message = await Message.find({
      conversationId: data,
    });
    if (message) {
      return {
        data: message,
        success: true,
        message: {
          ENG: "message found",
          VN: " Tìm thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      };
    }
    return {
      success: false,
      message: {
        ENG: "Failed",
        VN: "That bai",
      },
      status: HTTP_STATUS_CODE.BAD_REQUEST,
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
  createMessage,
  getMessage,
};
