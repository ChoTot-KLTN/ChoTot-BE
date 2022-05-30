exports.AUTH_PATH = {
  CHANGE_PASSWORD: "change-password",
  FORGOT_PASSWORD: "forgot-password",
  GET_AUTH: "get-auth",
  LOGIN: "login",
  REGISTER: "register",
  VERIFY: "verify",
  GETOTP: "get-otp",
  UPDATE_INFO: "update-info",
  SENDNEWPASS: "send-password",
};

exports.POST_PATH = {
  CREATE_POST: "create-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
  FIND_POST: "find-post",
  CREATE_POST_Apartment: "create-post-apartment",
  CREATE_POST_HOUSE: "create-post-house",
  CREATE_POST_GROUND: "create-post-ground",
  CREATE_POST_OFFICE: "create-post-office",
  CREATE_POST_MOTELROOM: "create-post-motelroom",
  CREATE_POST_PHONE: "create-post-phone",
  CREATE_POST_CAR: "create-post-car",
  CREATE_POST_MOTORBIKE: "create-post-motorbike",
  CREATE_POST_BICYCLE: "create-post-bicycle",
  CREATE_POST_LAPTOP: "create-post-laptop",
  GET_LIST_POST: "get-list-post",
  GET_ALL_POST: "get-all-post",
  GET_DETAIL_POST: "get-detail-post",
  RENEW_POST: "renew-post",
  PRIORITY_POST: "priority-post",
  GET_ALL_POST_Type: "get-all-post-type",
};

exports.CONVERSATION_PATH = {
  CREATE_CONVERSATION: "create-conversation",
  GET_CONVERSATION: "get-conversation",
};
exports.MESSAGE_PATH = {
  CREATE_MESSAGE: "create-message",
  GET_MESSAGE: "get-message",
};

exports.ADMIN_PATH = {
  GETALLUSER : "get-all-user",
  BLOCKUSER: "block-user",
  CHANGE_STATUS_POST: "change-status-post",
}

exports.PREFIX_PATH = {
  ADMIN: "admin",
  AUTH: "auth",
  USER: "user",
  POST: "post",
  CONVERSATION: "conversation",
  MESSAGE: "message",
};
