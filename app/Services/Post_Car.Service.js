
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostCar  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostCar = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
      const {typePost, type, address, brand, yearOfManufacture,
        carGearbox, fuel, numberOfSeat, color,  statusCar, numberOfKm, price, title, content , image}=body; 
        console.log(idUser);
        const newPostCar= await PostCar.create({
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
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostCar._id,
          onModel:"PostCar",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
        });
        // await newPostCar.save();
        // await newPost.save();
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Car post fail",
              VN: "Tạo bài đăng bán xe ô tô thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Car post successfully",
            VN: "Tạo bài đăng bán xe ô tô thành công",
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

  const updatePostCar = async (idPost,body)=> {
    try{
      const result = await PostCar.findOneAndUpdate({_id:idPost},body,{new:true,});
      if(!result)
      {
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {
        message: {
          ENG: "Update post successfully",
          VN: "Cập nhật thông tin bài đăng thành công",
        },
        success: true,
        status: HTTP_STATUS_CODE.OK,
        data: user,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  };
  const deletePostCar = async (idPost)=> {
    try{
      const result = await PostCar.findOneAndDelete({_id:idPost});
      if(!result)
      {
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {
        message: {
          ENG: "Delete post successfully",
          VN: "Xóa bài đăng thành công",
        },
        success: true,
        status: HTTP_STATUS_CODE.OK,
        data: user,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  };
  const getDetailPostCar = async(idPost)=> {
    try{
      const result = await PostCar.findOne({_id:idPost});
      if(!result){
        return {
          message: {
            ENG: "Post not find",
            VN: "Không tìm thấy bài post",
          },
          success: false,
          status: HTTP_STATUS_CODE.NOT_FOUND,
        };
      }
      return {  
        data: result,
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
  }

  module.exports={
    createPostCar,
    updatePostCar,
    deletePostCar,
    getDetailPostCar,}