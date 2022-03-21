
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostApartment } = require("../Models/Index.Model");

const createPostApartment = async (idUser,body) => {
    try {
      const {typePost, type, nameOfBuilding, address, codeBuilding, block, floor, typeBuilding, numberOfBedroom
      ,numberOfBathroom, balconyDirection, doorDirection, juridical, InteriorCondition, area, price, title, content , 
      image}=body; 
        console.log(idUser);
        const newPostApartment = new PostApartment({
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
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterApartment: newPostApartment._id,
          idUserPost:idUser,
        });
        await newPostApartment.save();
        await newPost.save();
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

  module.exports={createPostApartment}