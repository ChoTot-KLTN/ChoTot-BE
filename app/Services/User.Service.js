const { User, Post } = require("../Models/Index.Model");
const bcrypt = require("bcrypt");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const ObjectId = require('mongodb').ObjectId;

const updateInfo = async (userId, body) => {
  try {
    const user = await User.findById(userId);
    console.log(userId);
    if (!user) {
      return {
        success: false,
        message: {
          ENG: "Account not found",
          VN: "Tài khoản không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    Object.assign(user, body);
    await user.save();
    // const posts = await Post.find({idUserPost:userId});
    
    // await posts.updateMany({},{nameOfPoster:body.name},{upsert:true});
    // posts.forEach((e)=>{
    //   e.update({nameOfPoster:body.name});
    // })
    await Post.updateMany({idUserPost:userId},{nameOfPoster:body.name, phoneOfPoster:body.phone, avatarOfPoster: body.avatar, province: body.address.province });

    return {
      success: true,
      message: {
        ENG: "Account updated",
        VN: "Cập nhật thành công",
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

const getUserByID = async(query)=>{
  try{
    const {userId} = query;
    const userInfo = await User.aggregate([
      {
        $match:{'_id':ObjectId(userId)}
      },
      {
        $lookup:{
          from: 'ratings',
          localField: "_id",
          foreignField: "idOwner",
          as: "user_infor",
        }
      },
      {
        $unwind: {path:"$user_infor", preserveNullAndEmptyArrays: true},
      },
    ]);
    if (!userInfo) {
      return {
        success: false,
        message: {
          ENG: "User not found",
          VN: "Người dùng không tồn tại",
        },
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }
    let avgRate = 0;
    let l = 0;
    let total =0;
    if(!userInfo[0].user_infor){
      return {
        data:{
          infor:userInfo[0],
          totalRate: total,
          count: l ,
        },
        success: true,
        message: {
          ENG: "Get user infor successfully2",
          VN: "Lấy thông tin người dùng thành công",
        },
        status: HTTP_STATUS_CODE.OK,
      };
        
    }else{
      l = userInfo[0].user_infor.count;
        userInfo[0].user_infor.avgRate.forEach((e,index)=>{
          avgRate = avgRate + parseInt(e,10);
          
      });
      total = (avgRate/l).toFixed(1);
      return {
        data:{
          infor:userInfo[0],
          totalRate: total,
          count: l ,
        },
        success: true,
        message: {
          ENG: "Get user infor successfully1",
          VN: "Lấy thông tin người dùng thành công",
        },
        status: HTTP_STATUS_CODE.OK,
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

module.exports = {
  updateInfo,
  getUserByID,
};
