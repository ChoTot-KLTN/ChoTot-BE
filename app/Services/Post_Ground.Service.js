

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostGround  } = require("../Models/Index.Model");

const createPostGround = async (idUser,body) => {
    try {
      const {typePost, type, address, typeGround, groundDirection,
        juridical, area, height, width,  price, title, content , image}=body; 
        console.log(idUser);
        const newPostGround = new PostGround({
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
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterGround: newPostGround._id,
          idUserPost:idUser,
        });
        await newPostGround.save();
        await newPost.save();
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

  module.exports={createPostGround}