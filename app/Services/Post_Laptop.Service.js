

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostLaptop  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostLaptop = async (idUser,body) => {
    let now = new Date();
    let dateEnd = addDays(new Date(), 7);
    try {
      const {typePost, address, brand, color, microprocessor, ram, hardDrive, typeHardDrive, graphicsCard, 
        statusLaptop, guarantee, price, title, content , image}=body; 
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
        const newPostPhone = await PostLaptop.create({
          typePost:typePost,
          address: address,
          brand:brand,
          color: color,
          microprocessor:microprocessor,
          ram:ram,
          hardDrive:hardDrive,
          typeHardDrive:typeHardDrive,
          graphicsCard:graphicsCard,
          statusLaptop:statusLaptop,
          guarantee:guarantee,
          price:price,
        });
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostPhone._id,
          onModel:"PostLaptop",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostPhone.price,
          province: newPostPhone.address.province,
          nameOfPoster: nameOfPoster.name,
        });
        // await newPostPhone.save();
        // await newPost.save();
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Laptop post fail",
              VN: "Tạo bài đăng bán laptop thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Laptop post successfully",
            VN: "Tạo bài đăng bán laptop thành công",
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

  const updatePostLaptop = async (idPost,body)=> {
    try{
      const result = await PostLaptop.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostLaptop = async (idPost)=> {
    try{
      const result = await PostLaptop.findOneAndDelete({_id:idPost});
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
  const getDetailPostLaptop = async(idPost)=> {
    try{
      const result = await PostLaptop.findOne({_id:idPost});
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
    createPostLaptop,
    updatePostLaptop,
    deletePostLaptop,
    getDetailPostLaptop,}