
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostMotelRoom  } = require("../Models/Index.Model");

const createPostMotelRoom = async (idUser,body) => {
    try {
      const {typePost, type, address, interiorCondition, area, price, deposit, title, content , image}=body; 
        console.log(idUser);
        const newPostMotelRoom = new PostMotelRoom({
          typePost:typePost,
          type:type,
          address: address,
          interiorCondition:interiorCondition,
          area: area,
          price:price,
          deposit:deposit,
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterMotelRoom: newPostMotelRoom._id,
          idUserPost:idUser,
        });
        await newPostMotelRoom.save();
        await newPost.save();
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

  module.exports={createPostMotelRoom}