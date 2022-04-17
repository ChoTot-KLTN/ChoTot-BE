const { AUTH_PATH, CONVERSATION_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Conversation.Controller");
const controllerUser = require("../Controllers/User.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");

router
  .route(`/${CONVERSATION_PATH.CREATE_CONVERSATION}`)
  .post([], controller.creatConversation);
router
  .route(`/${CONVERSATION_PATH.GET_CONVERSATION}/:userId`)
  .get([], controller.getConversation);

module.exports = router;
