const { POST_PATH } = require("../Common/RoutePath");
const controller = require("../Controllers/Post.Controller");
const express = require("express");

const router = express.Router();
const { validateBody } = require("../Validations/Validation");
const { verifyToken } = require("../Middlewares/Token.Middleware");

router.route(`/${POST_PATH.CREATE_POST}`).post([verifyToken],controller.handleCreatePost);
router.route(`/${POST_PATH.DELETE_POST}`).delete([verifyToken],controller.handleDeletePost);
router.route(`/${POST_PATH.FIND_POST}`).get(controller.handleGetPostById);
router.route(`/${POST_PATH.UPDATE_POST}`).put([verifyToken],controller.handleUpdatePost);

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
router.route(`/${POST_PATH.GET_LIST_POST}`).get([verifyToken],controller.handleGetListPostByUser);
router.route(`/${POST_PATH.GET_ALL_POST}`).get(controller.handleGetListPost); 
router.route(`/${POST_PATH.GET_DETAIL_POST}`).get(controller.handleGetDetailPost);
router.route(`/${POST_PATH.GET_LIST_POST_OVER}`).get([verifyToken],controller.handleGetListPostOverdueByUser);
router.route(`/${POST_PATH.RENEW_POST}`).put([verifyToken],controller.handleRenewPost);
router.route(`/${POST_PATH.PRIORITY_POST}`).post([verifyToken],controller.handlePriorityPost);
router.route(`/${POST_PATH.PAYMENT_KV}`).post(controller.handlePaymentKVStore);
router.route(`/${POST_PATH.GET_ALL_POST_Type}`).get(controller.handleGetListPostWithType); 
router.route(`/${POST_PATH.GET_LIST_POST_CATEGORYTECH}`).get(controller.handleGetListPostWithCategory); 
router.route(`/${POST_PATH.GET_LIST_POST_CATEGORYCAR}`).get(controller.handleGetListPostWithCategoryCar); 
router.route(`/${POST_PATH.GET_LIST_POST_CATEGORYBDS}`).get(controller.handleGetListPostWithCategoryBDS); 
router.route('/revenue-month').get(controller.handleRevenueWithMonth); 
router.route('/favorite').post([verifyToken],controller.handleFavoritePost); 
router.route('/get-list-favorite').get([verifyToken],controller.handleGetListFavoritePost); 
router.route('/cancel-favorite').put([verifyToken],controller.handleCancelFavoritePost); 
router.route('/filter').get(controller.handleFilterPost); 
router.route('/filter-bds').get(controller.handleFilterPostBDS); 

module.exports = router;
