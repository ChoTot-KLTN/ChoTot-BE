

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostLaptop  } = require("../Models/Index.Model");

const createPostLaptop = async (idUser,body) => {
    try {
      const {typePost, address, brand, color, microprocessor, ram, hardDrive, typeHardDrive, graphicsCard, 
        statusLaptop, guarantee, price, title, content , image}=body; 
        console.log(idUser);
        const newPostPhone = new PostLaptop({
          typePost:typePost,
          address: address,
          brand:brand,
          color: color,
          microprocessor:microprocessor,
          ram:ram,
          hardDrive:hardDrive,
          typeHardDrive:typeHardDrive,
          graphicsCard:graphicsCard,
          statusLaptop:statusLaptop,
          guarantee:guarantee,
          price:price,
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterlaptop: newPostPhone._id,
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

  module.exports={createPostLaptop}