const { AUTH_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Auth.Controller");
const controllerUser = require("../Controllers/User.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");

router
  .route(`/${AUTH_PATH.REGISTER}`)
  .post([validateBody(schema.register)], controller.handleRegister);
router
  .route(`/${AUTH_PATH.LOGIN}`)
  .post([validateBody(schema.login)], controller.handleLogin);
router.route(`/${AUTH_PATH.VERIFY}`).post([], controller.handleVerify);
router.route(`/${AUTH_PATH.GETOTP}`).get([], controller.handleGetOTP);
router
  .route(`/${AUTH_PATH.GET_AUTH}`)
  .get([verifyToken], controller.handleGetAuth);
router
  .route(`/${AUTH_PATH.UPDATE_INFO}`)
  .post(
    [validateBody(schema.updateInfo), verifyToken],
    controllerUser.handleUpdateInfo
  );
module.exports = router;
