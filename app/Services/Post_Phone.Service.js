
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostPhone, User  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostPhone = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
      const {typePost, address, brand, color, ram, statusPhone, price, title, content , image}=body; 
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
        const newPostPhone = await PostPhone.create({
          typePost:typePost,
          address: address,
          brand:brand,
          color: color,
          ram:ram,
          statusPhone:statusPhone,
          price:price,
        });
  
        const newPost =  Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          //idPosterPhone: newPostPhone._id,
          on: newPostPhone._id,
          onModel: 'PostPhone',
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostPhone.price,
          province: newPostPhone.address.province,
          nameOfPoster: nameOfPoster.name,
          phoneOfPoster: nameOfPoster.phone,
          avatarOfPoster: nameOfPoster.avatar,
        });
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Phone post fail",
              VN: "Tạo bài đăng phone thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        // await newPostPhone.save();
        // await newPost.save();
        let totalPost =  nameOfPoster.posts;
       nameOfPoster.posts = totalPost + 1;
       await nameOfPoster.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Phone post successfully",
            VN: "Tạo bài đăng bán điện thoại thành công",
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

  const updatePostPhone = async (idPost,body)=> {
    try{
      const result = await PostPhone.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostPhone = async (idPost)=> {
    try{
      const result = await PostPhone.findOneAndDelete({_id:idPost});
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
  const getDetailPostPhone = async(idPost)=> {
    try{
      const result = await PostPhone.findOne({_id:idPost});
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
    createPostPhone,
    updatePostPhone,
    deletePostPhone,
    getDetailPostPhone,}