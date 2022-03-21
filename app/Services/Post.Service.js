const { Post, PostApartment, PostHouse } = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { assign } = require("nodemailer/lib/shared");

const createPost = async (idUser,body) => {
  try {
    const {typePost, type, nameOfBuilding, address, codeBuilding, block, floor, typeBuilding, numberOfBedroom
    ,numberOfBathroom, balconyDirection, doorDirection, juridical, InteriorCondition, area, price, title, content , 
    image}=body;
    if(typePost === "PostApartment") // bài post loại BĐS (Chung cư)
    {
      console.log(idUser);
      const newPostApartment = new PostApartment({
        typePost:typePost,
        type:type,
        nameOfBuilding: nameOfBuilding,
        address: address,
        codeBuilding: codeBuilding,
        block: block,
        floor: floor,
        typeBuilding:typeBuilding,
        numberOfBedroom:numberOfBedroom,
        numberOfBathroom: numberOfBathroom,
        balconyDirection:balconyDirection,
        doorDirection:doorDirection,
        juridical:juridical,
        InteriorCondition:InteriorCondition,
        area: area,
        price:price,
      });

      const newPost = new Post({
        title: title,
        content:content,
        image:image,
        typePost:typePost,
        idPosterApartment: newPostApartment._id,
        idUserPost:idUser,
      });
      await newPostApartment.save();
      await newPost.save();
      return {
        data: "data",
        success: true,
        message: {
          ENG: "Create Apartment post successfully",
          VN: "Tạo bài đăng chung cư thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      };
    }
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
