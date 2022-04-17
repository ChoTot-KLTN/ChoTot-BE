const { Conversation } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { send } = require("express/lib/response");

const createConversation = async (body) => {
  try {
    const senderId = body.senderId;
    const receiveId = body.receiveId;
    const conversationId =
      senderId.localeCompare(receiveId) === 1
        ? senderId + receiveId
        : receiveId + senderId;
    const conversation = await Conversation.findOne({
      _id: conversationId,
    });
    if (conversation) {
      return conversation;
    }

    const data = {
      _id: conversationId,
      members: [body.senderId, body.receiveId],
    };
    return await Conversation.create(data);
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
