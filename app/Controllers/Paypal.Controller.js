
const paypal = require("paypal-rest-sdk");
const { Post,Revenue} = require("../Models/Index.Model");
const queryString = require("query-string");

const OrderPaypal = async (req, res, next) => {
  const { price, idPost } = req.body;
  const dollar = price / 23100;
  const dollar2f = parseFloat(dollar.toFixed(2));
  const idUser = req.body.token.id;
  const reqQuery = queryString.stringify({
    idUser,
    dollar2f,
    price,
    idPost
  });

  // console.log("info: " + reqQuery);

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:`http://localhost:8080/payment/success?${reqQuery}`,
        // req.body.from === "web"
        //   ? `https://hqd-mobile-store-api.herokuapp.com/payment/success-web?${reqQuery}` 
        //   : `https://hqd-mobile-store-api.herokuapp.com/payment/success?${reqQuery}`, //http://localhost:8080 https://marketplace111.herokuapp.com
      cancel_url:"http://localhost:8080/payment/cancel"
        // req.body.from === "web"
        //   ? "https://hqd-mobile-store-api.herokuapp.com/payment/cancel-web"
        //   : "https://hqd-mobile-store-api.herokuapp.com/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Tiền hóa đơn",
              sku: "001",
              price: `${dollar2f}`,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: `${dollar2f}`,
        },
        description: "Tiền nâng cấp tin đăng",
      },
    ],
  };
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
    //    console.log(error.response.details);
       console.log(error);
    res.status(400).send({
        data: "",
        error: "Cannot create order!",
        message: {
          ENG: "Cannot create order!",
          VN: "Không thể tạo hóa đơn",
        },
        success: false,
      });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.status(200).send({
            data: payment.links[i].href,
            error: "Create order! success",
            message: {
              ENG: "Create order! success",
              VN: "Tạo hóa đơn thành công",
            },
            success: true,
          });
          //res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

const PaymentSuccess = async (req, res, next) => {
  const {
    idUser,
    dollar2f,
    price,
    idPost
  } = req.query;
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  //const price = req.query.price;
  // console.log(paymentId);
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: `${dollar2f}`,
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        res.status(400).send({
          data: "",
          error: "Payment Fail",
          message: {
            ENG: "Payment Fail",
            VN: "Thanh toán thất bại",
          },
        });
      } else {
        //save Order vao db
        try {
          let now = new Date();
          const post = await Post.findOne({ _id: idPost ,idUserPost:idUser});
          if (!post) {
            res.status(404).send({
              data: "",
              error: "Post not exist",
              message: {
                ENG: "Your post is not exsit",
                VN: "Bài đăng không tồn tại",
              },
            });
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
          res.status(200).send({
            data: "",
            message: {
              ENG: "Payment Succes",
              VN: "Thanh toán thành công",
            },
          });
        } catch (err) {
          console.log(err);
          res.status(400).send({
            data: "",
            error: "Payment Excute Fail",
            message: {
              ENG: "Payment Excute Fail",
              VN: "Thanh toán thất bại error",
            },
          });
        }
      }
    }
  );
};


const CancelPayment = async (req, res, next) => {
  res.status(400).send("Payment is canceled");
};

const RefundPayment = async (req, res, next) => {
  const { saleId, totalPrice } = req.body;
  const dollar = totalPrice / 23100;
  const dollar2f = parseFloat(dollar.toFixed(2));
  const data = {
    amount: {
      total: `${dollar2f}`,
      currency: "USD",
    },
  };
  paypal.sale.refund(saleId, data, function (error, refund) {
    if (error) {
      res.status(200).send({
        message: "Refund fail!",
        data: "",
        error: error,
      });
    } else {
      res.status(200).send({
        message: "Refund success!",
        data: refund,
        error: "",
      });
    }
  });
};

module.exports = {
  OrderPaypal,
  PaymentSuccess,
  CancelPayment,
  RefundPayment,
};
