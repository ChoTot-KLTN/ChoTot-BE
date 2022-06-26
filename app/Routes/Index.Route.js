const { required } = require("@hapi/joi");
const express = require("express");
const { PREFIX_PATH } = require("../Common/RoutePath");
const router = express.Router();

router.use(`/${PREFIX_PATH.AUTH}`, require("./Auth.Route"));
router.use(`/${PREFIX_PATH.POST}`, require("./Post.Route"));
router.use(`/${PREFIX_PATH.CONVERSATION}`, require("./Conversation.Route"));
router.use(`/${PREFIX_PATH.MESSAGE}`, require("./Message.Route"));
router.use(`/${PREFIX_PATH.ADMIN}`, require("./Admin.Route"));
router.use(`/${PREFIX_PATH.COMMENTS}`, require("./Comments.Route"));
router.use("/payment", require("./Paypal.Route"));
router.use("/vnpay", require("./VNPay.Route"));
router.use(`/${PREFIX_PATH.RATING}`,require("./Rating.Route"));
router.use(`/${PREFIX_PATH.REPORT}`,require("./ReportPost.Route"));

module.exports = router;
