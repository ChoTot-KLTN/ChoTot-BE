const { sendError, sendSuccess } = require("./Controller");
const { 
  createReport,
  getReportOfPost,
} = require("../Services/ReportPost.Service");

const handleCreateReport = async (req, res) => {
    //const token = req.body.token.id;
  // console.log(req.body);
  const result = await createReport(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};


const handleGetListReport = async (req, res) => {
  //const token = req.body.token.id;
// console.log(req.body);
const result = await getReportOfPost(req.query);
if (result.success)
  return sendSuccess(res, result.data, result.message, result.status);
return sendError(res, result.message, result.status);
// return sendSuccess(res, {}, "", 200);
};
module.exports={
  handleCreateReport,
  handleGetListReport
}