
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { findOneAndUpdate } = require("../Models/Account.Model");
const { Post, PostApartment } = require("../Models/Index.Model");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { result } = require("@hapi/joi/lib/base");


function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostApartment = async (idUser,body) => {
    try {
      const {typePost, type, nameOfBuilding, address, codeBuilding, block, floor, typeBuilding, numberOfBedroom
      ,numberOfBathroom, balconyDirection, doorDirection, juridical, InteriorCondition, area, price, title, content , 
      image}=body; 

      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
          
        const newPostApartment = await PostApartment.create({
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
        //const results =  await newPostApartment.save();
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idUserPost:idUser,
          on: newPostApartment._id,
          onModel: 'PostApartment',
          dateStartPost: now,
          dateEndPost: dateEnd,
        });

        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Apartment post fail",
              VN: "Tạo bài đăng chung cư thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
     
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Apartment post successfully",
            VN: "Tạo bài đăng chung cư thành công",
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

  const updatePostApartment = async (idPost,body)=> {
    try{
      const result = await PostApartment.findOneAndUpdate({_id:idPost},body,{new:true,});
      if(!result)
      {
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {
        message: {
          ENG: "Update post successfully",
          VN: "Cập nhật thông tin bài đăng thành công",
        },
        success: true,
        status: HTTP_STATUS_CODE.OK,
        data: user,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  };
  const deletePostApartment = async (idPost)=> {
    try{
      const result = await PostApartment.findOneAndDelete({_id:idPost});
      if(!result)
      {
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {
        message: {
          ENG: "Delete post successfully",
          VN: "Xóa bài đăng thành công",
        },
        success: true,
        status: HTTP_STATUS_CODE.OK,
        data: user,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  };

  const getDetailPostApartment = async(idPost)=> {
    try{
      const result = await PostApartment.findOne({_id:idPost});
      if(!result){
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {  
        data: result,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  }

  module.exports={
    createPostApartment,
    updatePostApartment,
    deletePostApartment,
    getDetailPostApartment,};