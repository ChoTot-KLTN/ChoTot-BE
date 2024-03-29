

const uuid = require("uuid").v1;
const {vnp_TmnCode,vnp_HashSecret,vnp_Url,vnp_ReturnUrl} = require("../Common/Config");
const { HTTP_STATUS_CODE, ROLE, AUTH_TYPE } = require("../Common/Constants");
const { Post,Revenue} = require("../Models/Index.Model");
const payment = async (req,body) =>{
    try {
        let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

        const transactions = body.amount*100;
        console.log(transactions);
        //   body.typeOrders == defaultTypeOrders.POINT
        //     ? `?price=${transactions}&idUser=${body.idUser}&point=${body.point}&typeOrders=${body.typeOrders}`
        // const external_return_url =  `?price=${transactions}&idPoster=${body.idPoster}&postID=${body.postID}`;
         const external_return_url =  "";
  
        let tmnCode = vnp_TmnCode;
        let secretKey = vnp_HashSecret;
        let vnpUrl = vnp_Url;
        let returnUrl = vnp_ReturnUrl;
        console.log(tmnCode);
        console.log(secretKey);
        console.log(vnpUrl);
        console.log(returnUrl);
        let date = new Date();
        const dateFormat=require('dateformat')
        let createDate = dateFormat(date, 'yyyymmddHHmmss');
        //var createDate = dateFormat(date, "yyyymmddHHmmss");
        let bankCode = body.bankCode;
  
        
        let orderId = dateFormat(date, 'HHmmss');

        let orderInfo = body.orderDescription;
        let orderType = body.typeOrders;
        let locale = body.language;
        if (locale === null || locale === "") {
          locale = "vn";
        }
        let currCode = "VND";
        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.0.1";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = orderInfo;
        vnp_Params["vnp_OrderType"] = orderType;
        vnp_Params["vnp_Amount"] = parseInt( transactions,10);
        vnp_Params["vnp_ReturnUrl"] = returnUrl + external_return_url;
        vnp_Params["vnp_IpAddr"] = "127.0.0.1";
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
          vnp_Params["vnp_BankCode"] = bankCode;
        }
  
        vnp_Params = sortObject(vnp_Params);
  
        let querystring = require("qs");
        let signData =
          secretKey + querystring.stringify(vnp_Params, { encode: false });
  
        let sha256 = require("sha256");
        //var crypto = require("crypto");     
        // let hmac = crypto.createHmac("sha512", secretKey);
        // let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        let secureHash = sha256(signData);
        vnp_Params["vnp_SecureHashType"] = "SHA256";
        //vnp_Params["vnp_SecureHash"] = signed;
        vnp_Params["vnp_SecureHash"] = secureHash;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
        console.log("VNP:",vnp_Params);
        return {
          message: "Successfully redirect link payment",
          success: true,
          data: { code: "00", url: vnpUrl },
        };
      } catch (error) {
        console.log(error);
        return { message: "An error occurred", success: false };
      }
};

const VNPayReturn = async(body)=>{
    try {
        let vnp_Params = {
          vnp_Amount: body.vnp_Amount,
          vnp_BankCode: body.vnp_BankCode,
          vnp_BankTranNo: body.vnp_BankTranNo,
          vnp_CardType: body.vnp_CardType,
          vnp_OrderInfo: body.vnp_OrderInfo,
          vnp_PayDate: body.vnp_PayDate,
          vnp_ResponseCode: body.vnp_ResponseCode,
          vnp_TmnCode: body.vnp_TmnCode,
          vnp_TransactionNo: body.vnp_TransactionNo,
          vnp_TransactionStatus: body.vnp_TransactionStatus,
          vnp_TxnRef: body.vnp_TxnRef,
          vnp_SecureHashType: body.vnp_SecureHashType,
          vnp_SecureHash: body.vnp_SecureHash,
        };
  
        const idPackageTemp = body.idPackageTemp;
        const typeCart = body.typeCart;
  
        let secureHash = vnp_Params["vnp_SecureHash"];
  
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];
  
        vnp_Params = this.sortObject(vnp_Params);
  
        let secretKey = vnp_HashSecret;
  
        let querystring = require("qs");
        let signData =
          secretKey + querystring.stringify(vnp_Params, { encode: false });
  
        let sha256 = require("sha256");
  
        let checkSum = sha256(signData);
  
        if (secureHash === checkSum) {
        }
              
      } catch (e) {
        console.log(e);
        return { message: "An error occurred", success: false };
      }
};

const sortObject = (o) => {
    let sorted = {},
      key,
      a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  };
const saveRevenueVNPay = async(idUser,body)=>{
  const {idPost,price}=body;
  try {
    let now = new Date();
    const post = await Post.findOne({ _id: idPost ,idUserPost:idUser});
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
    post.isAdvertised = true;
    post.priceAdvert = price;
    await post.save();
    const newRevenue = new Revenue({
      idPost:post._id,
      priceAdvert:price,
      dateStartAdvert:now,
      monthStart:now.getMonth() + 1,
      yearStart:now.getFullYear()
    });
    await newRevenue.save();
    return {
      data: "data",
      success: true,
      message: {
        ENG: "Payment successfully",
        VN: "Thanh toán thành công",
      },
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (err) {
    console.log(err);
    return {
      data: "data",
      success: false,
      message: {
        ENG: "Payment fail",
        VN: "Thanh toán thất bại",
      },
      status: HTTP_STATUS_CODE.BAD_REQUEST,
    };
  }
};
  module.exports={
    payment,
    VNPayReturn,
    sortObject,
    saveRevenueVNPay,
}

// const vnpayServices = new VNPayServices();
        //   const transactionsInfo = {
        //     idUser: idUser,
        //     typeOrders: defaultTypeOrders.ORDER,
        //     amount: `${~~prices}`,
        //     bankCode: "NCB",
        //     orderDescription: "Thanh toan hoa don mua hang Van Transport",
        //     language: "vn",
        //     typeCart: 'CLIENT',
        //     fullName: user.data.fullName,
        //     idPackageTemp: packageClientTemp._id,
        //   };
        //   const resultPayment = await vnpayServices.payment(
        //     transactionsInfo,
        //     req.headers,
        //     req.connection,
        //     req.socket,
        //   );
        //   if (resultPayment.success) {
        //       resultPayment.data.url,
        //       "Successfully create order"
        //   } else {
            
        //   }