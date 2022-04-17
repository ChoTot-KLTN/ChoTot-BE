const { MESSAGE_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Message.Controller");
const controllerUser = require("../Controllers/User.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");

router
  .route(`/${MESSAGE_PATH.CREATE_MESSAGE}`)
  .post([], controller.createMessage);
router
  .route(`/${MESSAGE_PATH.GET_MESSAGE}/:conversationId`)
  .get([], controller.getMessage);

module.exports = router;
