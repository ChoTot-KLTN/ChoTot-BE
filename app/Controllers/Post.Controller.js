const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {
  createPost,
  deletePost,
  updatePost,
  getPostById,
  getListPost,
  getAllPost,
  getDetailPost,
  overduePost,
  renewPost,
  priorityPost,
  getAllPostWithType,
  getAllPostWithCategoryTech,
  getAllPostWithCategoryCar,
  getAllPostWithCategoryBDS,
  revevueWithMonth,
  favoritePost,
  getListFavorite,
  cancelFavorite,
  filterPost,
  filterPostBDS,
} = require("../Services/Post.Service");

const { createPostApartment } = require("../Services/Post_Apartment.Service");
const { createPostHouse } = require("../Services/Post_House.Service");
const { createPostGround } = require("../Services/Post_Ground.Service");
const { createPostOffice } = require("../Services/Post_Office.Service");
const { createPostMotelRoom } = require("../Services/Post_Room.Service");
const { createPostPhone } = require("../Services/Post_Phone.Service");
const { createPostCar } = require("../Services/Post_Car.Service");
const { createPostMotorbike } = require("../Services/Post_Motorbike.Service");
const { createPostBicycle } = require("../Services/Post_Bicycle.Service");
const { createPostLaptop } = require("../Services/Post_Laptop.Service");

const handleCreatePost = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPost(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreatePostApartment = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostApartment(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreatePostHouse = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostHouse(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleCreatePostGround = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostGround(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreatePostOffice = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostOffice(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreateMotelRoom = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostMotelRoom(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreatePhone = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostPhone(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreateCar = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostCar(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleCreateMotorbike = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostMotorbike(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleCreateBicycle = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostBicycle(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleCreateLaptop = async (req, res) => {
  const token = req.body.token.id;
  const result = await createPostLaptop(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetListPostByUser = async (req, res) => {
  const token = req.body.token.id;
  const result = await getListPost(token, req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetListPost = async (req, res) => {
  const result = await getAllPost(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetPostById = async (req, res) => {
  const result = await getPostById(req.query.postId);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleUpdatePost = async (req, res) => {
  const result = await updatePost(req.query.postId, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleDeletePost = async (req, res) => {
  const token = req.body.token.id;
  const result = await deletePost(token, req.query.postId);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetDetailPost = async (req, res) => {
  const result = await getDetailPost(req.query.postId);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetListPostOverdueByUser = async (req, res) => {
  const token = req.body.token.id;
  const result = await overduePost(token, req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleRenewPost = async (req, res) => {
  const token = req.body.token.id;
  const result = await renewPost(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handlePriorityPost = async (req, res) => {
  const token = req.body.token.id;
  const result = await priorityPost(req, token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleGetListPostWithType= async (req, res) => {
  const result = await getAllPostWithType(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleGetListPostWithCategory= async (req, res) => {
  const result = await getAllPostWithCategoryTech(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleGetListPostWithCategoryCar= async (req, res) => {
  const result = await getAllPostWithCategoryCar(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleGetListPostWithCategoryBDS= async (req, res) => {
  const result = await getAllPostWithCategoryBDS(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleRevenueWithMonth= async (req, res) => {
  const result = await revevueWithMonth(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleFavoritePost = async (req, res) => {
  const token = req.body.token.id;
  const result = await favoritePost(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleGetListFavoritePost = async (req, res) => {
  const token = req.body.token.id;
  const result = await getListFavorite(token);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleCancelFavoritePost = async (req, res) => {
  const token = req.body.token.id;
  const result = await cancelFavorite(token, req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
const handleFilterPost= async (req, res) => {
  const result = await filterPost(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

const handleFilterPostBDS= async (req, res) => {
  const result = await filterPostBDS(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};
module.exports = {
  handleCreatePost,
  handleDeletePost,
  handleGetPostById,
  handleUpdatePost,
  handleCreatePostApartment,
  handleCreatePostHouse,
  handleCreatePostGround,
  handleCreatePostOffice,
  handleCreateMotelRoom,
  handleCreatePhone,
  handleCreateCar,
  handleCreateMotorbike,
  handleCreateBicycle,
  handleCreateLaptop,
  handleGetListPostByUser,
  handleGetListPost,
  handleGetDetailPost,
  handleGetListPostOverdueByUser,
  handleRenewPost,
  handlePriorityPost,
  handleGetListPostWithType,
  handleGetListPostWithCategory,
  handleGetListPostWithCategoryCar,
  handleGetListPostWithCategoryBDS,
  handleRevenueWithMonth,
  handleFavoritePost,
  handleGetListFavoritePost,
  handleCancelFavoritePost,
  handleFilterPost,
  handleFilterPostBDS,
};
