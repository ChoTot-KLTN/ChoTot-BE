
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostCar  } = require("../Models/Index.Model");

const createPostCar = async (idUser,body) => {
    try {
      const {typePost, type, address, brand, yearOfManufacture,
        carGearbox, fuel, numberOfSeat, color,  statusCar, numberOfKm, price, title, content , image}=body; 
        console.log(idUser);
        const newPostCar= new PostCar({
          typePost:typePost,
          type:type,
          address: address,
          brand:brand,
          yearOfManufacture:yearOfManufacture,
          carGearbox:carGearbox,
          fuel: fuel,
          numberOfSeat: numberOfSeat,
          color: color,
          statusCar:statusCar,
          numberOfKm:numberOfKm,
          price:price
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterCar: newPostCar._id,
          idUserPost:idUser,
        });
        await newPostCar.save();
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

  module.exports={createPostCar}