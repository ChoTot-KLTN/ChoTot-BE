
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post, PostApartment, PostHouse } = require("../Models/Index.Model");

const createPostHouse = async (idUser,body) => {
    try {
      const {typePost, type, address, codeHouse, block, numberOfFloor, typeHouse, numberOfBedroom
      ,numberOfBathroom,  doorDirection, juridical, InteriorCondition, area, height,width,  price, title, content , 
      image}=body; 
        console.log(idUser);
        const newPostHouse = await PostHouse.create({
          typePost:typePost,
          type:type,
          address: address,
          codeHouse: codeHouse,
          block: block,
          typeHouse:typeHouse,
          numberOfBedroom:numberOfBedroom,
          numberOfBathroom: numberOfBathroom,
          numberOfFloor: numberOfFloor,
          doorDirection:doorDirection,
          juridical:juridical,
          InteriorCondition:InteriorCondition,
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
          on: newPostHouse._id,
          onModel:"PostHouse",
          idUserPost:idUser,
        });
        // await newPostHouse.save();
        // await newPost.save();
        if(!newPost){
          return {
            success: false,
            message: {
              ENG: "Create House post fail",
              VN: "Tạo bài đăng bán nhà thất bại",
            },
            status: HTTP_STATUS_CODE.FORBIDDEN,
          };
        }
        return {
          data: "data",
          success: true,
          message: {
            ENG: "Create House post successfully",
            VN: "Tạo bài đăng nhà ở thành công",
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

 const updatePostHouse = async (idPost,body)=> {
  try{
    const result = await PostHouse.findOneAndUpdate({_id:idPost},body,{new:true,});
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

const deletePostHouse = async (idPost)=> {
  try{
    const result = await PostHouse.findOneAndDelete({_id:idPost});
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

  module.exports={
    createPostHouse,
    updatePostHouse,
    deletePostHouse,}