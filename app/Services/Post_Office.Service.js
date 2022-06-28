


const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post , PostOffice, User } = require("../Models/Index.Model");

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const createPostOffice = async (idUser,body) => {
    try {
      let now = new Date();
      let dateEnd = addDays(new Date(), 7);
      const {typePost, type, address, nameOfBuilding, codeBuilding, block, floor,  typeOffice, doorDirection, interiorCondition,
        juridical, area,  price, title, content , image}=body; 
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
        const newPostOffice = await PostOffice.create({
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
  
        const newPost = await Post.create({
          title: title,
          content:content,
          image:image,
          typePost:typePost,
          on: newPostOffice._id,
          onModel:"PostOffice",
          idUserPost:idUser,
          dateStartPost: now,
          dateEndPost: dateEnd,
          prePrice: newPostOffice.price,
          province: newPostOffice.address.province,
          nameOfPoster: nameOfPoster.name,
          phoneOfPoster: nameOfPoster.phone,
          avatarOfPoster: nameOfPoster.avatar,
        });

        // await newPostOffice.save();
        // await newPost.save();
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create Office post fail",
              VN: "Tạo bài đăng cho thuê mặt bằng thất bại",
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

  const updatePostOffice = async (idPost,body)=> {
    try{
      const result = await PostOffice.findOneAndUpdate({_id:idPost},body,{new:true,});
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
  const deletePostOffice = async (idPost)=> {
    try{
      const result = await PostOffice.findOneAndDelete({_id:idPost});
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
  const getDetailPostOffice = async(idPost)=> {
    try{
      const result = await PostOffice.findOne({_id:idPost});
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
    createPostOffice,
    updatePostOffice,
    deletePostOffice,
    getDetailPostOffice,}