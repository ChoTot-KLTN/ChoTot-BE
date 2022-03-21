
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostApartment, PostHouse } = require("../Models/Index.Model");

const createPostHouse = async (idUser,body) => {
    try {
      const {typePost, type, address, codeHouse, block, numberOfFloor, typeHouse, numberOfBedroom
      ,numberOfBathroom,  doorDirection, juridical, InteriorCondition, area, height,width,  price, title, content , 
      image}=body; 
        console.log(idUser);
        const newPostHouse = new PostHouse({
          typePost:typePost,
          type:type,
          address: address,
          codeHouse: codeHouse,
          block: block,
          typeHouse:typeHouse,
          numberOfBedroom:numberOfBedroom,
          numberOfBathroom: numberOfBathroom,
          numberOfFloor: numberOfFloor,
          doorDirection:doorDirection,
          juridical:juridical,
          InteriorCondition:InteriorCondition,
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
          idPosterHouse: newPostHouse._id,
          idUserPost:idUser,
        });
        await newPostHouse.save();
        await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create House post successfully",
            VN: "Tạo bài đăng nhà ở thành công",
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

  module.exports={createPostHouse}