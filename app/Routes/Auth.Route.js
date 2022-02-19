
const { AUTH_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Auth.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();

router.route(`/${AUTH_PATH.REGISTER}`).post([],controller.handleRegister);
router.route(`/${AUTH_PATH.LOGIN}`).post([],controller.handleLogin);
router.route(`/${AUTH_PATH.VERIFY}`).post([],controller.handleVerify);
module.exports = router;