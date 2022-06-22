

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostMotorbike  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostMotorbike = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
      const {typePost, type, address, brand, yearOfRegistration,
        typeMotorbike, capacity,  statusMotorbike, numberOfKm, price, title, content , image}=body; 
        console.log(idUser);
        const nameOfPoster = await User.findOne({_id:idUser});
        if(!nameOfPoster){
          return {
            success: false,
            message: {
              ENG: "User not found",
              VN: "Không tìm thấy User",
            },
            status: HTTP_STATUS_CODE.NOT_FOUND,
          };
        }
        const newPostMotorbike= await PostMotorbike.create({
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
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostMotorbike._id,
          onModel:"PostMotorbike",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostMotorbike.price,
          province: newPostMotorbike.address.province,
          nameOfPoster: nameOfPoster.name,
          phoneOfPoster: nameOfPoster.phone,
        });
        // await newPostMotorbike.save();
        // await newPost.save();
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Motorbike post fail",
              VN: "Tạo bài đăng bán xe máy thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Motorbike post successfully",
            VN: "Tạo bài đăng bán xe máy thành công",
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
  const updatePostMotorbike = async (idPost,body)=> {
    try{
      const result = await PostMotorbike.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostMotobike = async (idPost)=> {
    try{
      const result = await PostMotorbike.findOneAndDelete({_id:idPost});
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
  const getDetailPostMotorbike = async(idPost)=> {
    try{
      const result = await PostMotorbike.findOne({_id:idPost});
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
    createPostMotorbike,
    updatePostMotorbike,
    deletePostMotobike,
    getDetailPostMotorbike,}