const { Post,Rating } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const Understand = require("twilio/lib/rest/preview/Understand");

const createRating = async(body)=>{
    try{
        const {idOwner,rate}=body;
        const rateExist = await Rating.findOne({idOwner:idOwner});
        if(rateExist==null || rateExist == undefined){
            let arrRating = [rate];
            let count = 1;
            const newRate = Rating({
                idOwner:idOwner,
                avgRate:arrRating,
                count:count
            });
            const result = await Rating.create(newRate);
            return {
                data: result,
                success: true,
                message: {
                  ENG: "Rate created",
                  VN: "Đã tạo thành công",
                },
                status: HTTP_STATUS_CODE.OK,
              };
        }
        else{
            rateExist.avgRate.push(rate);
            rateExist.count +=1;
            await rateExist.save();
            return {
                data: "data",
                success: true,
                message: {
                  ENG: "Rate created",
                  VN: "Đã tạo thành công",
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

const getRatingInfor =async(query)=>{
    try{
        const {idOwner}=query;
        const getRating = await Rating.findOne({idOwner:idOwner});
        if(!getRating){
            return{
                data: {
                    rate:0,
                    count:0
                },
                success: true,
                message: {
                  ENG: "Rate not found",
                  VN: "Không tìm được rate",
                },
                status: HTTP_STATUS_CODE.NOT_FOUND,
            }
        }
        let avgRate = 0;
        let l = getRating.count;
        getRating.avgRate.forEach((e,index)=>{
            avgRate = avgRate + parseInt(e,10);
        });
       
        return{
            data: {
                rate:avgRate/l,
                count:getRating.count
            },
            success: true,
            message: {
              ENG: "Data of Rate",
              VN: "Dữ liệu đánh giá",
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

module.exports={
    createRating,
    getRatingInfor,
}