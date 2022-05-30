const express = require("express");
const router = express.Router();
const PaymentController = require("../Controllers/VNPay.Controller");
const { verifyToken } = require("../Middlewares/Token.Middleware");


router.post("/revenue",[verifyToken], PaymentController.handleSaveRevenueVNPay);

module.exports = router;