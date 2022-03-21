
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostPhone  } = require("../Models/Index.Model");

const createPostPhone = async (idUser,body) => {
    try {
      const {typePost, address, brand, color, ram, statusPhone, price, title, content , image}=body; 
        console.log(idUser);
        const newPostPhone = new PostPhone({
          typePost:typePost,
          address: address,
          brand:brand,
          color: color,
          ram:ram,
          statusPhone:statusPhone,
          price:price,
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterPhone: newPostPhone._id,
          idUserPost:idUser,
        });
        await newPostPhone.save();
        await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Phone post successfully",
            VN: "Tạo bài đăng bán điện thoại thành công",
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

  module.exports={createPostPhone}