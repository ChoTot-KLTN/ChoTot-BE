const { MESSAGE_PATH, RATING_PATH, REPORT_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/ReportPost.Controller");
const express = require("express");
const { verifyToken } = require("../Middlewares/Token.Middleware");
const router = express.Router();
const { schema } = require("../Validations/Auth.Validation");
const { validateBody } = require("../Validations/Validation");
const { route } = require("./Comments.Route");



router.route(`/${REPORT_PATH.CREATEREPORT}`).post(controller.handleCreateReport);
router.route(`/${REPORT_PATH.GETREPORT}`).get(controller.handleGetListReport);

module.exports = router;