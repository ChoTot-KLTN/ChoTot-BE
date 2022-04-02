
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostMotelRoom  } = require("../Models/Index.Model");

const createPostMotelRoom = async (idUser,body) => {
    try {
      const {typePost, type, address, interiorCondition, area, price, deposit, title, content , image}=body; 
        console.log(idUser);
        const newPostMotelRoom = await PostMotelRoom.create({
          typePost:typePost,
          type:type,
          address: address,
          interiorCondition:interiorCondition,
          area: area,
          price:price,
          deposit:deposit,
        });
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostMotelRoom._id,
          onModel:"PostMotelRoom",
          idUserPost:idUser,
        });
        // await newPostMotelRoom.save();
        // await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Motel Room post successfully",
            VN: "Tạo bài đăng thuê phòng trọ thành công",
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

  const updatePostMotelRoom = async (idPost,body)=> {
    try{
      const result = await PostMotelRoom.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostMotelRoom = async (idPost)=> {
    try{
      const result = await PostMotelRoom.findOneAndDelete({_id:idPost});
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

  module.exports={
    createPostMotelRoom,
    updatePostMotelRoom,
    deletePostMotelRoom,}