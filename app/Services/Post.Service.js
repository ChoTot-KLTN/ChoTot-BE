const { Post } = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { assign } = require("nodemailer/lib/shared");

const createPost = async (body) => {
  try {
    const post = await Post.create(body);
    return {
      data: post,
      success: true,
      message: {
        ENG: "Create successfully",
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

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    return {
      success: true,
      data: post,
      message: {
        ENG: "Post found",
        VN: "Đã tìm thấy bài viết",
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

const deletePost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    await post.remove();

    return {
      success: true,
      message: {
        ENG: "Post deleted",
        VN: "Đã xóa bài viết",
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

const updatePost = async (postId, body) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    Object.assign(post, body);
    post.save();
    return {
      data: post,
      success: true,
      message: {
        ENG: "Post updated",
        VN: "Đã cập nhật bài viết",
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
  createPost,
  deletePost,
  updatePost,
  getPostById,
};
