
const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {VNPayReturn,saveRevenueVNPay} = require("../Services/VNPay.Service");

const handleSaveRevenueVNPay = async (req, res) => {
  const token = req.body.token.id;
  const result = await saveRevenueVNPay(token,req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

module.exports={handleSaveRevenueVNPay};

//   const  handleVnpayReturn = async(
//     req,
//     res,
//     next,
//   )=> {
//     try {
//       const body = req.query;
//     //   const vnpayServices: VnpayServices = new VnpayServices();
//       const result = await VNPayReturn(body);
//       if (result.success) {
//         res.render("success", { code: "00" });
//       } else {
//         res.render("success", { code: "97" });
//       }
//     } catch (e) {
//       console.log(e);
//       res.json({
//           'message':{
//               "ENG":"Payment fail",
//               "VN":"Thanh toán thành công"
//           },
//           'status':200,
//           'data':'Thanh toán thất bại'
//       });
//     }
// }




