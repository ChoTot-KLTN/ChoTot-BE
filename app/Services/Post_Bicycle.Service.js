

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostBicycle, User  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostBicycle = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
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
      const {typePost, type, address, brand, 
        typeBicycle, engine,  statusBicycle, guarantee, price, title, content , image}=body; 
        console.log(idUser);
        const newPostBicycle= await PostBicycle.create({
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
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostBicycle._id,
          onModel:"PostBicycle",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostBicycle.price,
          province: newPostBicycle.address.province,
          nameOfPoster: nameOfPoster.name,
          phoneOfPoster: nameOfPoster.phone,
          avatarOfPoster: nameOfPoster.avatar,
        });
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Electric Bicyle post fail",
              VN: "Tạo bài đăng xe điện thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
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

  const updatePostBicycle = async (idPost,body)=> {
    try{
      const result = await PostBicycle.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostBicycle = async (idPost)=> {
    try{
      const result = await PostBicycle.findOneAndDelete({_id:idPost});
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
  const getDetailPostBicycle = async(idPost)=> {
    try{
      const result = await PostBicycle.findOne({_id:idPost});
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
    createPostBicycle,
    updatePostBicycle,
    deletePostBicycle,
    getDetailPostBicycle,}