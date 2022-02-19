
const { AUTH_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Auth.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();

router.route(`/${AUTH_PATH.REGISTER}`).post([],controller.handleRegister);
module.exports = router;