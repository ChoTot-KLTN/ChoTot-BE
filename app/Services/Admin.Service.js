const { Post, PostApartment, PostHouse,PostGround, PostOffice, 
    PostMotelRoom, PostPhone, PostCar, PostMotorbike, PostBicycle,
    PostLaptop,Account} = require("../Models/Index.Model");
const { mapToRegexContains } = require("../Common/Helper");
  
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const {updatePostApartment, deletePostApartment,getDetailPostApartment} = require("./Post_Apartment.Service");
const {updatePostHouse, deletePostHouse,getDetailPostHouse} = require("./Post_House.Service");
const {updatePostGround, deletePostGround,getDetailPostGround} = require("./Post_Ground.Service");
const {updatePostOffice, deletePostOffice,getDetailPostOffice} = require("./Post_Office.Service");
const {updatePostMotelRoom, deletePostMotelRoom,getDetailPostMotelRoom} = require("./Post_Room.Service");
const {updatePostCar,deletePostCar,getDetailPostCar} = require("./Post_Car.Service");
const {updatePostMotorbike,deletePostMotobike,getDetailPostMotorbike} = require("./Post_Motorbike.Service");
const {updatePostBicycle,deletePostBicycle,getDetailPostBicycle} = require("./Post_Bicycle.Service");
const {updatePostPhone,deletePostPhone,getDetailPostPhone} = require("./Post_Phone.Service");
const {updatePostLaptop,deletePostLaptop,getDetailPostLaptop}= require("./Post_Laptop.Service");

const getAllUser = async (query) => { // không cần populate qua bảng User 
    try {
      let {page, limit} = query;
      page = parseInt(query.page,10) || 0; 
      limit = parseInt(query.limit,10) || 10;
      const options = { password: 0 };
      const optionReceive = query.option;
      if (Array.isArray(optionReceive)) {
        optionReceive.forEach((option) => {
          options[option] = 1;
        });
        delete options.password;
      } else if (typeof optionReceive === "string") {
        options[optionReceive] = 1;
        delete options.password;
      }
      const accounts = await Account.find({}, options).populate(
        "idUser",
        options
      )
      .skip(page * limit)
      .limit(limit); ;
      return {
        message: {
          ENG: "Get list User successfully",
          VN: "Lấy tất cả người dùng thành công",
        },
        data: accounts || [],
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

  const lockUser = async(body)=>{
    try{
      const update = {status:"lock"};
      const blockUser = await Account.findOneAndUpdate({username:body.email},update,{new:true});
      if(!blockUser){
        return {
          success: false,
          message: {
            ENG: "User not found",
            VN: "Không tìm thấy người dùng",
          },
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {
        success: true,
        message: {
          ENG: "Lock user successfully",
          VN: "Khóa người dùng thành công",
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

  const updateStatusPost = async(body)=>{
    try{
      const {postID,status} = body;
      const update = {status:status};
      const statusPost = await Post.findOneAndUpdate({_id:postID},update,{new:true});
      if(!statusPost){
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
        message: {
          ENG: "Change status post successfully",
          VN: "Cập nhật trạng thái bài viết thành công",
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
    getAllUser,
    lockUser,
    updateStatusPost,
  };