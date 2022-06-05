const { Comments,User } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { send } = require("express/lib/response");

const createComments = async (body, token) => {
  try {
    const data = {
      postId: body.postId,
      idUserComment: token,
      text: body.text,
    };
    const comment = await Comments.create(data);
    return {
      data: comment,
      success: true,
      message: {
        ENG: "Comment created",
        VN: "Đã tạo thành công",
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

const getComments = async (query) => {
  console.log("data",query.postID);
  try {
    const comments = await Comments.find({
      postId: query.postID,
      isDeleted: false,
    })
    .populate("idUserComment")
    
    // const comments = await Comments.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "idUserComment",
    //       foreignField: "_id",
    //       as: "comment_detail",
    //     },
    //   },    
    //   {
    //     $unwind: "$comment_detail",
    //   },
    // ]);
    if (comments) {
      return {
        data: comments,
        success: true,
        message: {
          ENG: "Comments found",
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

const updateComments = async (commentId, body) => {
  try {
    console.log(commentId, body);
    const updateComments = await Comments.updateOne({ _id: commentId }, body);
    const comments = await Comments.findById(commentId);
    if (comments) {
      return {
        data: comments,
        success: true,
        message: {
          ENG: "Comments updated",
          VN: " Cập nhật thành công",
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

const deleteComments = async (commentId, body) => {
  try {
    console.log(commentId, body);
    const deleteComments = await Comments.updateOne(
      { _id: commentId },
      { isDeleted: true }
    );
    // const comments = await Comments.findById(commentId);// sao
    return {
      success: true,
      message: {
        ENG: "Comments deleted",
        VN: " Xóa thành công",
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
  createComments,
  getComments,
  updateComments,
  deleteComments,
};
