const { POST_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Post.Controller");
const express = require("express");

const router = express.Router();
const { validateBody } = require("../Validations/Validation");
const { verifyToken } = require("../Middlewares/Token.Middleware");

router.route(`/${POST_PATH.CREATE_POST}`).post([verifyToken],controller.handleCreatePost);
router.route(`/${POST_PATH.DELETE_POST}`).delete(controller.handleDeletePost);
router.route(`/${POST_PATH.FIND_POST}`).get(controller.handleGetPostById);
router.route(`/${POST_PATH.UPDATE_POST}`).put(controller.handleUpdatePost);

router.route(`/${POST_PATH.CREATE_POST_Apartment}`).post([verifyToken],controller.handleCreatePostApartment);
router.route(`/${POST_PATH.CREATE_POST_HOUSE}`).post([verifyToken],controller.handleCreatePostHouse);
router.route(`/${POST_PATH.CREATE_POST_GROUND}`).post([verifyToken],controller.handleCreatePostGround);
router.route(`/${POST_PATH.CREATE_POST_OFFICE}`).post([verifyToken],controller.handleCreatePostOffice);
router.route(`/${POST_PATH.CREATE_POST_MOTELROOM}`).post([verifyToken],controller.handleCreateMotelRoom);
router.route(`/${POST_PATH.CREATE_POST_PHONE}`).post([verifyToken],controller.handleCreatePhone);
router.route(`/${POST_PATH.CREATE_POST_CAR}`).post([verifyToken],controller.handleCreateCar);
router.route(`/${POST_PATH.CREATE_POST_MOTORBIKE}`).post([verifyToken],controller.handleCreateMotorbike);
router.route(`/${POST_PATH.CREATE_POST_BICYCLE}`).post([verifyToken],controller.handleCreateBicycle);
router.route(`/${POST_PATH.CREATE_POST_LAPTOP}`).post([verifyToken],controller.handleCreateLaptop);
module.exports = router;
