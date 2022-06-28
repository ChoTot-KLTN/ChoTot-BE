const { Post,Report } = require("../Models/Index.Model");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
// const Understand = require("twilio/lib/rest/preview/Understand");

const createReport = async(body) =>{
    try{
        const {idPost, idReporter, reason, nameReporter, avatar} =body;
        const reportExist = await Report.findOne({ idPost:idPost, idReporter:idReporter});
        
        if(reportExist!=null || reportExist != undefined){
            return {
                data: "data",
                success: true,
                message: {
                  ENG: "You had already reported this port",
                  VN: "Bạn đã báo cáo bài viết này rồi",
                },
                status: HTTP_STATUS_CODE.CONFLICT,
              };
        }
        // nếu chưa từng báo cáo bài viết thì có thể tạo report
        const newReportData = Report({
            idPost:idPost,
            idReporter:idReporter,
            reason:reason,
            nameReporter:nameReporter,
            avatar:avatar
        });
        const newReport = await Report.create(newReportData);
        const updatePost = await Post.findOne({_id:idPost});
        let totalReport = updatePost.numberOfReport;
        updatePost.numberOfReport = totalReport + 1;
        await updatePost.save();
        return {
            data: newReport,
            success: true,
            message: {
              ENG: "Report created",
              VN: "Đã tạo báo cáo thành công",
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

const getReportOfPost = async (query)=>{
    try{
        let {page, limit, idPost} = query;
        page = parseInt(query.page,10) || 0; 
        limit = parseInt(query.limit,10) || 10;
        const getListReport = await Report.find({idPost:idPost}) 
        .skip(page * limit)
        .limit(limit);
        // console.log(!getListReport);
        return {
            data: getListReport,
            success: true,
            message: {
              ENG: "Get list report successfully",
              VN: "Lấy danh sách báo cáo thành công",
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

module.exports={
    createReport,
    getReportOfPost
}