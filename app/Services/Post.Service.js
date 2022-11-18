const { Post, PostApartment,Revenue,Favorite, PostHouse,PostGround, PostOffice, 
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
const {payment} = require("./VNPay.Service");

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
    let now = new Date();
    let {page, limit,status} = query;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
    //if(status != undefined && status !=null) status = parseInt(query.status,10)||0
    console.log("ID: "+idPoster)
    const getListPost = await Post.find({idUserPost:idPoster,status:status,dateEndPost:{$gte:now}})
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
      let now = new Date();
      let {page, limit, status,isAdvert} = query;
      page = parseInt(query.page,10) || 0; 
      limit = parseInt(query.limit,10) || 10;
      if(isAdvert != undefined && isAdvert !=null){
        isAdvert = true;
       }else{
        isAdvert = false;
       }
      const allPost = await Post.find({status:status,dateEndPost:{$gte:now},isAdvertised:isAdvert})
      .populate("on")
      .skip(page * limit)
      .limit(limit); 
      const getTotal = await Post.find({status:status,dateEndPost:{$gte:now},isAdvertised:isAdvert});
      const total = getTotal.length;
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

const overduePost = async (idPoster, query) => {
  // Các bài post của người dùng quá hạn
  try{
    let now = new Date();
    let {page, limit,status} = query;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
    //if(status != undefined && status !=null) status = parseInt(query.status,10)||0
    console.log("ID: "+idPoster)
    const getListPost = await Post.find({idUserPost:idPoster,status:status,dateEndPost:{$lte:now}})
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


function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}
const renewPost = async(idPoster,body)=>{
  // tạo mới thường
  try{
    const {idPost,days} = body;
    let now = new Date();
    let dateEnd = addDays(new Date(), days);
    
    const post = await Post.findOne({_id:idPost,idUserPost:idPoster});
    if(!post){
      return {
        data:"data",
        success:false,
        message: {
          ENG: "post not found",
          VN: "Không tìm thấy bài viết",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      }
    }
    if(post.isAdvertised===true){
      post.isAdvertised = false;
      post.dateEndPost = dateEnd;
    }else{
      post.dateEndPost = dateEnd;
    }
    await post.save();
    return {
      data:"data",
      success:true,
      message: {
        ENG: "renew post successfully",
        VN: "Gia hạn bài đăng thành công",
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

const priorityPost = async (req,idPoster,body)=>{
  try{
    const {idPost,prices,nameOfPoster} = body;
    
    console.log("idPost: " ,idPost);
    console.log("priceAdvert: ", prices);
    console.log("Name: ", nameOfPoster,idPoster );
    const transactionsInfo = {
      idPoster: idPoster,
      typeOrders: "payment",
      amount: `${~~prices}`,
      bankCode: "NCB",
      orderDescription: "Nang cap tin dang uu tien",
      language: "vn",
      typeCart: 'CLIENT',
      fullName: nameOfPoster,
      postID: idPost,
     
    };
    
    const resultPayment = await payment(
      req,
      transactionsInfo,
    );
    if (resultPayment.success) {
      return{
        success:true,
        message:{
          END:"Priority upgrade successful",
          VN:"Thanh toán thành công",
        },
        data:resultPayment.data.url,
        status: HTTP_STATUS_CODE.OK,
      }; 
    } else {
      return{
        success:false,
        message:{
          END:"Priority upgrade fail",
          VN:"Thanh toán thất bại",
        },
        data:resultPayment.data.url,
        status:HTTP_STATUS_CODE.FORBIDDEN,
      }; 
    }
  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const paymentKVStore = async (req,body)=>{
  try{
    const {idUser,prices,nameOfUser} = body;
    

    console.log("priceAdvert: ", prices);
    console.log("Name: ", nameOfUser,idUser );
    const transactionsInfo = {
      idUser: idUser,
      typeOrders: "payment",
      amount: `${~~prices}`,
      bankCode: "NCB",
      orderDescription: "Thanh toan hoa don",
      language: "vn",
      typeCart: 'CLIENT',
      fullName: nameOfUser,
    };
    
    const resultPayment = await payment(
      req,
      transactionsInfo,
    );
    if (resultPayment.success) {
      return{
        success:true,
        message:{
          END:"Payment successful",
          VN:"Thanh toán thành công",
        },
        data:resultPayment.data.url,
        status: HTTP_STATUS_CODE.OK,
      }; 
    } else {
      return{
        success:false,
        message:{
          END:"payment fail",
          VN:"Thanh toán thất bại",
        },
        data:resultPayment.data.url,
        status:HTTP_STATUS_CODE.FORBIDDEN,
      }; 
    }
  }catch(error){
    return {
      success: false,
      message: error.message,
      status: error.status,
    };
  }
};

const getAllPostWithType = async(query)=>{
  // load các bài post đã được duyệt lên trang chủ không cần authen
  try{
    let now = new Date();
    let {page, limit, status,type,isAdvert} = query;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
   if(isAdvert != undefined && isAdvert !=null){
    isAdvert = true;
   }else{
    isAdvert = false;
   }
    const allPost = await Post.find({status:status,onModel:type,dateEndPost:{$gte:now},isAdvertised:isAdvert})
    .populate("on")
    .skip(page * limit)
    .limit(limit); 
    const getTotal = await Post.find({status:status,onModel:type,dateEndPost:{$gte:now},isAdvertised:isAdvert});
    const total = getTotal.length;
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
};

const getAllPostWithCategoryTech = async(query)=>{
  // load các bài post đã được duyệt lên trang chủ không cần authen
  try{
    let now = new Date();
    let {page, limit,isAdvert,isRecent,...remainQuery} = query;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
   if(isAdvert != undefined && isAdvert !=null){
    isAdvert = true;
   }else{
    isAdvert = false;
   }
   console.log("isRecent",isRecent);
    const allPost = await Post.aggregate([
      {
        $match:{
          $or:[{'onModel':'PostLaptop'},{'onModel':'PostPhone'}],
          'status':2,
          'dateEndPost':{$gte:now},
          'isAdvertised':isAdvert,
          // 'dateStartPost':{$lte:addDays(dateStartPost,2)}
        }
      },
      {
        $skip:page*limit
      },
      {
        $limit:limit
      },
     
    ]);
    let result = [];
   allPost.forEach((element, index)=>{
    let dateCompare = addDays(element.createdAt,3);
     if(now <= dateCompare){
       result.push(element);
     }
   });
   let result1 = isRecent!= undefined ? allPost : result;
    if(allPost){
      return{
        data: {
          // total:total,
           posts: result1
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
};



const getAllPostWithCategoryCar = async(query)=>{
  // load các bài post đã được duyệt lên trang chủ không cần authen
  try{
    let now = new Date();
    let {page, limit, isRecent,isAdvert,...remainQuery} = query;
    console.log('isRecent',isRecent)
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
   if(isAdvert != undefined && isAdvert !=null){
    isAdvert = true;
   }else{
    isAdvert = false;
   }
   
    const allPost = await Post.aggregate([
      {
        $match:{
          $or:[{'onModel':'PostMotorbike'},{'onModel':'PostBicycle'},{'onModel':'PostCar'}],
          'status':2,
          'dateEndPost':{$gte:now},
          'isAdvertised':isAdvert,
        }
      },
      {
        $skip:page*limit
      },
      {
        $limit:limit
      },
    ]);
    let result = [];
    allPost.forEach((element, index)=>{
      let dateCompare = addDays(element.createdAt,3);
      if(now <= dateCompare){
        result.push(element);
      }
    });
    console.log("length: ", result.length)
    let result1 = isRecent!= undefined ? allPost : result;
    if(allPost){
      return{
        data: {
          // total:total,
           posts: result1
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
};

const getAllPostWithCategoryBDS = async(query)=>{
  // load các bài post đã được duyệt lên trang chủ không cần authen
  try{
    let now = new Date();
    let {page, limit, isRecent,isAdvert,...remainQuery} = query;
    
    // console.log(page,limit,status,isAdvert)
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
   if(isAdvert != undefined && isAdvert !=null){
    isAdvert = true;
   }else{
    isAdvert = false;
   }
 
    const allPost = await Post.aggregate([
      {
        $match:{
          $or:[{'onModel':'PostApartment'},{'onModel':'PostHouse'},{'onModel':'PostGround'},
          {'onModel':'PostOffice'},{'onModel':'PostMotelRoom'}],
          'status':2,
          'dateEndPost':{$gte:now},
          'isAdvertised':isAdvert,
        }
      },
      {
        $skip:page*limit
      },
      {
        $limit:limit
      },
    ]);
    let result = [];
    allPost.forEach((element, index)=>{
      let dateCompare = addDays(element.createdAt,3);
      if(now <= dateCompare){
        result.push(element);
      }
    });
    let result1 = isRecent!= undefined ? allPost : result;
    if(allPost){
      return{
        data: {
          // total:total,
           posts: result1
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
};


const revevueWithMonth = async (query)=>{
  try{
    const {year} = query;
    let result = {
      'One':0,
      'Two':0,
      'Three':0,
      'Four':0,
      'Five':0,
      'Six':0,
      'Seven':0,
      'Eight':0,
      'Nine':0,
      'Ten':0,
      'Elevent':0,
      'Twelve':0,
    };
    let total = 0;
    const revenueMonth = await Revenue.find({yearStart:year});
    revenueMonth.forEach((element,index)=>{
        total += element.priceAdvert;
        if(element.monthStart===1){
          result.One = result.One +  element.priceAdvert;
        }
        else if(element.monthStart===2){
          result.Two = result.Two + element.priceAdvert;
        }
        else if(element.monthStart===3){
          result.Three = result.Three + element.priceAdvert;
        }
        else if(element.monthStart===4){
          result.Four = result.Four+  element.priceAdvert;
        }
        else if(element.monthStart===5){
          result.Five = result.Five+ element.priceAdvert;
        }
        else if(element.monthStart===6){
          result.Six = result.Six + element.priceAdvert;
        }
        else if(element.monthStart===7){
          result.Seven =  result.Seven + element.priceAdvert;
        }
        else if(element.monthStart===8){
          result.Eight =  result.Eight + element.priceAdvert;
        }
        else if(element.monthStart===9){
          result.Nine =  result.Nine + element.priceAdvert;
        }
        else if(element.monthStart===10){
          result.Ten =  result.Ten+  element.priceAdvert;
        }
        else if(element.monthStart===11){
          result.Elevent =  result.Elevent + element.priceAdvert;
        }
        else if(element.monthStart===12){
          result.Twelve =  result.Twelve  + element.priceAdvert;
        }
    });
    if(revenueMonth){
      return{
        data: { 
                total: total,
                result: result
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
};

const favoritePost = async(idUser,body)=>{
  try{
    const {idPost}=body;
    const data = {
      postId: idPost,
      idUser: idUser,
    };
    const favoriteExist = await Favorite.findOne({ idUser: idUser, postId: idPost,});
    if(favoriteExist!=null){
      return {
        data: 'data',
        success: false,
        message: {
          ENG: "Favorited post Existed",
          VN: "Đã thích bài viết",
        },
        status: HTTP_STATUS_CODE.CONFLICT,
      };
    }
    
    const favorite = await Favorite.create(data);
    return {
      data: favorite,
      success: true,
      message: {
        ENG: "Favorited post Successfully",
        VN: "Thích bài đăng thành công",
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

const getListFavorite = async(idUser)=>{
  try{
    const listFavorite = await Favorite.find({ idUser: idUser,isActive:true})
    .populate('postId');
    const result = [];
    let now = new Date();
    listFavorite.forEach((e,index)=>{
      if(e.postId.dateEndPost >= now){
          result.push(e);
      }
    });
    if(listFavorite){
      return{
        data: result,
        success: true,
        message: {
          ENG: "Get list favorite post successfully",
          VN: "Lấy danh sách bài đăng thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      }
    }
    return {
      data:"data",
      success:false,
      message: {
        ENG: "Get list favorite post fail",
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
};

const cancelFavorite = async(idUser,body)=>{
  try{
    const {isActive,idFavorite}=body;
    console.log(idUser)
    console.log(idFavorite)
    const update = {isActive:body.isActive};
    const cancelFav = await Favorite.findOneAndUpdate({idUser:idUser,_id:idFavorite},update,{new:true});
    if(!cancelFav){
      return {
        success: false,
        message: {
          ENG: "Post not found",
          VN: "Không tìm thấy bài post",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: {
        ENG: "cancel favorite post successfully",
        VN: "Hủy thích bài đăng thành công",
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
}


const filterPost = async (query)=>{
  try{
    let now = new Date();
    let {page, limit, maxPrice, minPrice, province, category, brand}=query;
    // console.log(maxPrice+0);
    maxPrice = ~~maxPrice || 1000000000;
    minPrice = ~~minPrice || 0;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
    const queryOject = {
      $and:[ {prePrice:{$lte:maxPrice}}, {prePrice:{$gte:minPrice}}],
      'dateEndPost':{$gte:now},
    };
    if (province) queryOject.province = { $regex: province, $options: "i" };
    if (category) queryOject.onModel = { $regex: category, $options: "i" };

   
    const filter = await Post.aggregate([
      {
        $match:queryOject,
      },
      {
        $lookup:{
          from: category.toLowerCase()+'s',
          localField: "on",
          foreignField: "_id",
          as: "post_infor",
        }
      },
      {
        $unwind: {path:"$post_infor", preserveNullAndEmptyArrays: true,},
      },
      {
        $match:brand ? {"post_infor.brand":brand} :  {},
      },
      {
        $skip:page*limit
      },
      {
        $limit:limit
      },
    ]);
    return {
      data:filter,
      success:true,
      message: {
        ENG: "filter successfully",
        VN: "Tìm thấy sản phẩm",
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

const filterPostBDS = async (query)=>{
  try{
    let now = new Date();
    let {page, limit, maxPrice, minPrice, province, category, area, maxArea, minArea}=query;
    // console.log(maxPrice+0);
    maxPrice = ~~maxPrice || 1000000000;
    minPrice = ~~minPrice || 0;
    area = ~~area || 20;
    maxArea = ~~maxArea || 1000;
    minArea = ~~minArea || 20;
    page = parseInt(query.page,10) || 0; 
    limit = parseInt(query.limit,10) || 10;
    const queryOject = {
      $and:[ {prePrice:{$lte:maxPrice}}, {prePrice:{$gte:minPrice}}],
      'dateEndPost':{$gte:now},

    };
    if (province) queryOject.province = { $regex: province, $options: "i" };
    if (category) queryOject.onModel = { $regex: category, $options: "i" };

   
    const filter = await Post.aggregate([
      {
        $match:queryOject,
      },
      {
        $lookup:{
          from: category.toLowerCase()+'s',
          localField: "on",
          foreignField: "_id",
          as: "post_infor",
        }
      },
      {
        $unwind: {path:"$post_infor", preserveNullAndEmptyArrays: true,},
      },
      {
        $match:area ? {$and:[ {"post_infor.area":{$lte:maxArea}}, {"post_infor.area":{$gte:minArea}}]} : {},
      },
      {
        $skip:page*limit
      },
      {
        $limit:limit
      },
    ]);
    return {
      data:filter,
      success:true,
      message: {
        ENG: "filter successfully",
        VN: "Tìm thấy sản phẩm",
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

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPostById,
  getListPost, // get list này có authen theo user
  getAllPost, // get list này không cần authen
  getDetailPost,
  overduePost,
  renewPost,
  priorityPost,
  getAllPostWithType,
  getAllPostWithCategoryTech,
  getAllPostWithCategoryCar,
  getAllPostWithCategoryBDS,
  revevueWithMonth,
  favoritePost,
  getListFavorite,
  cancelFavorite,
  filterPost,
  filterPostBDS,
  paymentKVStore,
};
