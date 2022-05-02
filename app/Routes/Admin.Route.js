
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");
const { ADMIN_PATH,PREFIX_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Admin.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();

router.route(`/${ADMIN_PATH.GETALLUSER}`).get([verifyToken],controller.handleGetAllUser);
router.route(`/${ADMIN_PATH.BLOCKUSER}`).put([verifyToken],controller.handleBlockUser);
router.route(`/${ADMIN_PATH.CHANGE_STATUS_POST}`).put([verifyToken],controller.handleChangeStatusPost);

module.exports = router;