const { Post, PostApartment, PostHouse,PostGround, PostOffice, 
  PostMotelRoom, PostPhone, PostCar, PostMotorbike, PostBicycle,
  PostLaptop,} = require("../Models/Index.Model");
  const { mapToRegexContains } = require("../Common/Helper");

const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { assign } = require("nodemailer/lib/shared");
const {updatePostApartment, deletePostApartment,getDetailPostApartment} = require("./Post_Apartment.Service");
const {updatePostHouse, deletePostHouse,getDetailPostHouse} = require("./Post_House.Service");
const {updatePostGround, deletePostGround,getDetailPostGround} = require("./Post_Ground.Service");
const {updatePostOffice, deletePostOffice,getDetailPostOffice} = require("./Post_Office.Service");
const {updatePostMotelRoom, deletePostMotelRoom,getDetailPostMotelRoom} = require("./Post_Room.Service");
const {updatePostCar,deletePostCar,getDetailPostCar} = require("./Post_Car.Service");
const {updatePostMotorbike,deletePostMotobike,getDetailPostMotorbike} = require("./Post_Motorbike.Service");
const {updatePostBicycle,deletePostBicycle,getDetailPostBicycle} = require("./Post_Bicycle.Service");
const {updatePostPhone,deletePostPhone,getDetailPostPhone} = require("./Post_Phone.Service");
const {updatePostLaptop,deletePostLaptop,getDetailPostLaptop}= require("./Post_Laptop.Service");
const { is } = require("express/lib/request");

const createPost = async (idUser,body) => {
  try {
    const {typePost, type, nameOfBuilding, address, codeBuilding, block, floor, typeBuilding, numberOfBedroom
    ,numberOfBathroom, balconyDirection, doorDirection, juridical, InteriorCondition, area, price, title, content , 
    image}=body;
    if(typePost === "PostApartment") // bài post loại BĐS (Chung cư)
    {
      console.log(idUser);
      const newPostApartment = new PostApartment({
        typePost:typePost,
        type:type,
        nameOfBuilding: nameOfBuilding,
        address: address,
        codeBuilding: codeBuilding,
        block: block,
        floor: floor,
        typeBuilding:typeBuilding,
        numberOfBedroom:numberOfBedroom,
        numberOfBathroom: numberOfBathroom,
        balconyDirection:balconyDirection,
        doorDirection:doorDirection,
        juridical:juridical,
        InteriorCondition:InteriorCondition,
        area: area,
        price:price,
      });

      const newPost = new Post({
        title: title,
        content:content,
        image:image,
        typePost:typePost,
        idPosterApartment: newPostApartment._id,
        idUserPost:idUser,
      });
      await newPostApartment.save();
      await newPost.save();
      return {
        data: "data",
        success: true,
        message: {
          ENG: "Create Apartment post successfully",
          VN: "Tạo bài đăng chung cư thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      };
    }
    return {
      data: post,
      success: true,
      message: {
        ENG: "Create successfully",
        VN: "Đã tạo thành công",
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

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
    .populate("on");
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    return {
      success: true,
      data: post,
      message: {
        ENG: "Post found",
        VN: "Đã tìm thấy bài viết",
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

const deletePost = async (idUser,postId) => {
  try {
    const post = await Post.findOne({_id:postId, idUserPost:idUser});
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    let result  =async () =>null;
    if(post.onModel === "PostApartment"){
      result = await deletePostApartment(post.on);
    }else if(post.onModel === "PostPhone"){
      result = await deletePostPhone(post.on);
    }else if(post.onModel === "PostHouse"){
      result = await deletePostHouse(post.on);
    }else if(post.onModel === "PostGround"){
      result = await deletePostGround(post.on);
    }else if(post.onModel === "PostOffice"){
      result = await deletePostOffice(post.on);
    }else if(post.onModel === "PostMotelRoom"){
      result = await deletePostMotelRoom(post.on);
    }else if(post.onModel === "PostCar"){
      result = await deletePostCar(post.on);
    }else if(post.onModel === "PostMotorbike"){
      result = await deletePostMotobike(post.on);
    }else if(post.onModel === "PostBicycle"){
      result = await deletePostBicycle(post.on);
    }else if(post.onModel === "PostLaptop"){
      result = await deletePostLaptop(post.on);
    }

    if(!result){
      return {
        success: true,
        message: {
          ENG: "Delete post fail",
          VN: "Xóa bài viết thất bại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    await post.remove();
    return {
      success: true,
      message: {
        ENG: "Post deleted successfully",
        VN: "Đã xóa bài viết",
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

const updatePost = async (postId, body) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    // update post cha nếu có
    if(body.post!=null){
      await Post.findOneAndUpdate({_id:postId},body.post,{new:true,});
    } 
     //'PostApartment', 'PostHouse', 'PostGround', 'PostOffice', 'PostMotelRoom', 
    //'PostCar', 'PostMotorbike', 'PostBicycle', 'PostLaptop', 'PostPhone'
    let result  =async () =>null;
    if(post.onModel === "PostApartment"){
      result = await updatePostApartment(post.on,body.postDetail);
    }else if(post.onModel === "PostPhone"){
      result = await updatePostPhone(post.on, body.postDetail);
    }else if(post.onModel === "PostHouse"){
      result = await updatePostHouse(post.on, body.postDetail);
    }else if(post.onModel === "PostGround"){
      result = await updatePostGround(post.on, body.postDetail);
    }else if(post.onModel === "PostOffice"){
      result = await updatePostOffice(post.on, body.postDetail);
    }else if(post.onModel === "PostMotelRoom"){
      result = await updatePostMotelRoom(post.on, body.postDetail);
    }else if(post.onModel === "PostCar"){
      result = await updatePostCar(post.on, body.postDetail);
    }else if(post.onModel === "PostMotorbike"){
      result = await updatePostMotorbike(post.on, body.postDetail);
    }else if(post.onModel === "PostBicycle"){
      result = await updatePostBicycle(post.on, body.postDetail);
    }else if(post.onModel === "PostLaptop"){
      result = await updatePostLaptop(post.on, body.postDetail);
    }

    console.log('result: ' , result);
    if(!result){
      return {
        success: false,
        message: {
          ENG: "Update post fail",
          VN: "Cập nhật bài post thất bại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
      
    }
    return {
      success: false,
      message: {
        ENG: "Update post successfully",
        VN: "Cập nhật bài viết thành công",
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


const getListPost = async(idPoster, query)=>{
  try{
    let {page, limit, status} = query;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
    if(status != undefined && status !=null) status = parseInt(query.status,10)||0
    const getListPost = await Post.find({idUserPost:idPoster,status:status})
    .populate("on")
    .skip(page * limit)
    .limit(limit);  
    const total = getListPost.length;
    return{
      data: {
        total:total,
         posts: getListPost
        },
      success: true,
      message: {
        ENG: "Get list post by user successfully",
        VN: "Lấy danh sách theo user thành công",
      },
      status: HTTP_STATUS_CODE.OK,
    }

  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
  
};
const getAllPost = async(query)=>{
    // load các bài post đã được duyệt lên trang chủ không cần authen
    try{
      let {page, limit, status} = query;
      page = parseInt(query.page,10) || 0; 
      limit = parseInt(query.limit,10) || 10;
      if(status != undefined && status !=null) status = parseInt(query.status,10)||2
      const allPost = await Post.find()
      .populate("on")
      .skip(page * limit)
      .limit(limit); 
      const total = allPost.length;
      if(allPost){
        return{
          data: {
            total:total,
             posts: allPost
            },
          success: true,
          message: {
            ENG: "Get list post successfully",
            VN: "Lấy danh sách bài đăng thành công",
          },
          status: HTTP_STATUS_CODE.OK,
        }
      }
      return {
        data:"data",
        success:false,
        message: {
          ENG: "Get list post fail",
          VN: "Lấy danh sách bài đăng không thành công",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      }
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
}

const getDetailPost = async (postId) => {
  try {
    const post = await Post.findOne({_id:postId});
    if (!post) {
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    'PostApartment', 'PostHouse', 'PostGround', 'PostOffice', 'PostMotelRoom', 
    'PostCar', 'PostMotorbike', 'PostBicycle', 'PostLaptop', 'PostPhone'
    let result  =async () =>null;
    if(post.onModel === 'PostApartment'){
        result = await getDetailPostApartment(post.on);
    }else if(post.onModel === 'PostHouse'){
        result = await getDetailPostHouse(post.on);
    }else if(post.onModel === 'PostGround'){
        result = await getDetailPostGround(post.on);
    }else if(post.onModel === 'PostOffice'){
        result = await getDetailPostOffice(post.on);
    }else if(post.onModel === 'PostMotelRoom'){
        result = await getDetailPostMotelRoom(post.on);
    }else if(post.onModel === 'PostMotorbike'){
        result = await getDetailPostMotorbike(post.on);
    }else if(post.onModel === 'PostBicycle'){
        result = await getDetailPostBicycle(post.on);
    }else if(post.onModel === 'PostLaptop'){
        result = await getDetailPostLaptop(post.on);
    }else if(post.onModel === 'PostPhone'){
        result = await getDetailPostPhone(post.on);
    }else{
      //PostCar
        result = await getDetailPostCar(post.on);
    }

    if(!result){
      return {
        success: true,
        message: {
          ENG: "Get detail post fail",
          VN: "Lấy bài viết thất bại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    return {
      success: true,
      data: result.data,
      message: {
        ENG: "Get detail post successfully",
        VN: "Lấy bài viết thành công",
      },
      status: HTTP_STATUS_CODE.OK,
    };
    }catch(error){
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    }
};
module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPostById,
  getListPost, // get list này có authen theo user
  getAllPost, // get list này không cần authen
  getDetailPost,
};
