

const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostGround,User  } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}

const createPostGround = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
      const {typePost, type, address, typeGround, groundDirection,
        juridical, area, height, width,  price, title, content , image}=body; 
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
        const newPostGround = await PostGround.create({
          typePost:typePost,
          type:type,
          address: address,
          typeGround:typeGround,
          groundDirection:groundDirection,
          juridical:juridical,
          area: area,
          height: height,
          width: width,
          price:price,
        });
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostGround._id,
          onModel:"PostGround",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostGround.price,
          province: newPostGround.address.province,
          nameOfPoster: nameOfPoster.name,
          phoneOfPoster: nameOfPoster.phone,
          avatarOfPoster: nameOfPoster.avatar,
        });
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Ground post fail",
              VN: "Tạo bài đăng bán đất thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
       let totalPost =  nameOfPoster.posts;
       nameOfPoster.posts = totalPost + 1;
       await nameOfPoster.save();
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create Ground post successfully",
            VN: "Tạo bài đăng bán đất thành công",
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

  const updatePostGround = async (idPost,body)=> {
    try{
      const result = await PostGround.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostGround = async (idPost)=> {
    try{
      const result = await PostGround.findOneAndDelete({_id:idPost});
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
  const getDetailPostGround = async(idPost)=> {
    try{
      const result = await PostGround.findOne({_id:idPost});
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
    createPostGround,
    updatePostGround,
    deletePostGround,
    getDetailPostGround,}