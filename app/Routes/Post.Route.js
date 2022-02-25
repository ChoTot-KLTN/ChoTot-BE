const { POST_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Post.Controller");
const express = require("express");

const router = express.Router();
const { validateBody } = require("../Validations/Validation");

router.route(`/${POST_PATH.CREATE_POST}`).post(controller.handleCreatePost);
router.route(`/${POST_PATH.DELETE_POST}`).delete(controller.handleDeletePost);
router.route(`/${POST_PATH.FIND_POST}`).get(controller.handleGetPostById);
router.route(`/${POST_PATH.UPDATE_POST}`).put(controller.handleUpdatePost);

module.exports = router;
