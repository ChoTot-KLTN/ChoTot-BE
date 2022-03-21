

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostMotorbike  } = require("../Models/Index.Model");

const createPostMotorbike = async (idUser,body) => {
    try {
      const {typePost, type, address, brand, yearOfRegistration,
        typeMotorbike, capacity,  statusMotorbike, numberOfKm, price, title, content , image}=body; 
        console.log(idUser);
        const newPostMotorbike= new PostMotorbike({
          typePost:typePost,
          type:type,
          address: address,
          brand:brand,
          yearOfRegistration:yearOfRegistration,
          typeMotorbike:typeMotorbike,
          capacity: capacity,
          statusMotorbike:statusMotorbike,
          numberOfKm:numberOfKm,
          price:price
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterMotorBike: newPostMotorbike._id,
          idUserPost:idUser,
        });
        await newPostMotorbike.save();
        await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Car post successfully",
            VN: "Tạo bài đăng bán xe thành công",
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

  module.exports={createPostMotorbike}