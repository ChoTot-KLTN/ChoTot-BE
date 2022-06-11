const { sendError, sendSuccess } = require("./Controller");
const { createRating,
    getRatingInfor} = require("../Services/RatingService");

const handleCreateRating = async (req, res) => {
    //const token = req.body.token.id;
  // console.log(req.body);
  const result = await createRating(req.body);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};

const handleGetRatingInfor = async (req, res) => {
  // console.log(req.body);
  const result = await getRatingInfor(req.query);
  if (result.success)
    return sendSuccess(res, result.data, result.message, result.status);
  return sendError(res, result.message, result.status);
  // return sendSuccess(res, {}, "", 200);
};


module.exports = {
    handleCreateRating,
    handleGetRatingInfor,
};
