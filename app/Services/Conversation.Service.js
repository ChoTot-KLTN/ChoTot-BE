const { Conversation } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { send } = require("express/lib/response");

const createConversation = async (body) => {
  try {
    console.log(body);
    const data = {
      members: [body.senderId, body.receiveId],
    };
    const conversation = await Conversation.create(data);
    if (conversation) {
      return {
        success: true,
        message: {
          ENG: "Conversation created",
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

const getConversation = async (data) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: data },
    });
    if (conversation) {
      return {
        data: conversation,
        success: true,
        message: {
          ENG: "Conversation found",
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
  createConversation,
  getConversation,
};
