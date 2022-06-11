const { MESSAGE_PATH, COMMENTS_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Comments.Controller");
const controllerUser = require("../Controllers/User.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");

router
  .route(`/${COMMENTS_PATH.CREATE_COMMENTS}`)
  .post([verifyToken], controller.createComments);
router
  .route(`/${COMMENTS_PATH.GET_COMMENTS}`)
  .get([], controller.getComments);
router
  .route(`/${COMMENTS_PATH.UPDATE_COMMENTS}/:commentId`)
  .put([], controller.updateComments);
router
  .route(`/${COMMENTS_PATH.DELETE_COMMENTS}`)
  .post([verifyToken], controller.deleteComments);

module.exports = router;
