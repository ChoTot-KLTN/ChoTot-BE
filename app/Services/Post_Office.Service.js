


const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post , PostOffice } = require("../Models/Index.Model");

const createPostOffice = async (idUser,body) => {
    try {
      const {typePost, type, address, nameOfBuilding, codeBuilding, block, floor,  typeOffice, doorDirection, interiorCondition,
        juridical, area,  price, title, content , image}=body; 
        console.log(idUser);
        const newPostOffice = new PostOffice({
          typePost: typePost,
          type: type,
          address: address,
          nameOfBuilding: nameOfBuilding,
          codeBuilding: codeBuilding,
          block: block,
          floor: floor,
          typeOffice: typeOffice,
          doorDirection: doorDirection,
          interiorCondition :interiorCondition,
          juridical: juridical,
          area: area,
          price:price,
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterOffice: newPostOffice._id,
          idUserPost:idUser,
        });
        await newPostOffice.save();
        await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Office post successfully",
            VN: "Tạo bài đăng thuê mặt bằng thành công",
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

  module.exports={createPostOffice}