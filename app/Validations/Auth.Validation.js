const Joi = require("@hapi/joi");
const { REGEX } = require("../Common/Regex");

module.exports.schema = {
  register: Joi.object().keys({
    name: Joi.string().regex(REGEX.UNICODE_LETTER).required(),
    email: Joi.string().regex(REGEX.EMAIL).required(),
    phone: Joi.string().regex(REGEX.PHONE_VN).required(),
    address: Joi.object({
      detail: Joi.string().regex(REGEX.UNICODE_STRING).required(),
      village: Joi.string().regex(REGEX.UNICODE_STRING).required(),
      district: Joi.string().regex(REGEX.UNICODE_STRING).required(),
      province: Joi.string().regex(REGEX.UNICODE_STRING).required(),
    }),
    password: Joi.string().regex(REGEX.PASSWORD).required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().regex(REGEX.EMAIL).required(),
    password: Joi.string().regex(REGEX.PASSWORD).required(),
  }),
  updateInfo: Joi.object().keys({
    name: Joi.string().regex(REGEX.UNICODE_LETTER).allow(null),
    phone: Joi.string().regex(REGEX.PHONE_VN).allow(null),
    address: Joi.object({
      detail: Joi.string().regex(REGEX.UNICODE_STRING).allow(null),
      village: Joi.string().regex(REGEX.UNICODE_STRING).allow(null),
      district: Joi.string().regex(REGEX.UNICODE_STRING).allow(null),
      province: Joi.string().regex(REGEX.UNICODE_STRING).allow(null),
    }),
    avatar: Joi.string().required(),
  }),
};
