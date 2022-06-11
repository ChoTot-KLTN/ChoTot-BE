const { MESSAGE_PATH, RATING_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Rating.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");
const { route } = require("./Comments.Route");

router.route(`/${RATING_PATH.CREATERATING}`).post(controller.handleCreateRating);
router.route(`/${RATING_PATH.GETRATINGINFOR}`).get(controller.handleGetRatingInfor);

module.exports = router;