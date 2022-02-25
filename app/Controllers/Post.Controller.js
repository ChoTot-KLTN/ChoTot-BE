const { encodedToken } = require("../Middlewares/Token.Middleware");
const { sendError, sendSuccess } = require("./Controller");
const {
  createPost,
  deletePost,
  updatePost,
  getPostById,
} = require("../Services/Post.Service");

const handleCreatePost = async (req, res) => {
  const result = await createPost(req.body);
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
  const result = await deletePost(req.query.postId);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
};

module.exports = {
  handleCreatePost,
  handleDeletePost,
  handleGetPostById,
  handleUpdatePost,
};
