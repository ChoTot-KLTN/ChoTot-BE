

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostBicycle  } = require("../Models/Index.Model");

const createPostBicycle = async (idUser,body) => {
    try {
      const {typePost, type, address, brand, 
        typeBicycle, engine,  statusBicycle, guarantee, price, title, content , image}=body; 
        console.log(idUser);
        const newPostBicycle= new PostBicycle({
          typePost:typePost,
          type:type,
          address: address,
          brand:brand,
          typeBicycle:typeBicycle,
          engine: engine,
          statusBicycle:statusBicycle,
          guarantee:guarantee,
          price:price
        });
  
        const newPost = new Post({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          idPosterElectricBicycle: newPostBicycle._id,
          idUserPost:idUser,
        });
        await newPostBicycle.save();
        await newPost.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Electric Bicycle post successfully",
            VN: "Tạo bài đăng bán xe điện thành công",
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

  module.exports={createPostBicycle}