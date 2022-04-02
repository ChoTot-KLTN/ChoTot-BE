

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostGround  } = require("../Models/Index.Model");

const createPostGround = async (idUser,body) => {
    try {
      const {typePost, type, address, typeGround, groundDirection,
        juridical, area, height, width,  price, title, content , image}=body; 
        console.log(idUser);
        const newPostGround = await PostGround.create({
          typePost:typePost,
          type:type,
          address: address,
          typeGround:typeGround,
          groundDirection:groundDirection,
          juridical:juridical,
          area: area,
          height: height,
          width: width,
          price:price,
        });
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostGround._id,
          onModel:"PostGround",
          idUserPost:idUser,
        });
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Ground post fail",
              VN: "Tạo bài đăng bán đất thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Ground post successfully",
            VN: "Tạo bài đăng bán đất thành công",
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

  const updatePostGround = async (idPost,body)=> {
    try{
      const result = await PostGround.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostGround = async (idPost)=> {
    try{
      const result = await PostGround.findOneAndDelete({_id:idPost});
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
    createPostGround,
    updatePostGround,
    deletePostGround,}