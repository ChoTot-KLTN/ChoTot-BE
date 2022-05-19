const twilio = require('twilio');
const {AccountSID, AuthToken, TWILIO_PHONENUMBER} = require("../Common/Config");
const client = new twilio(AccountSID, AuthToken);
const sendSMS =async (data) =>  {
    console.log("AccountSID: ",AccountSID);
    console.log("AuthToken: ",AuthToken);
  await client.messages
  .create({
    body: data.message,
    to:`+84${data.phoneNumber}`,
    from: TWILIO_PHONENUMBER,
  }).then(message=>console.log(message))
  .catch(error=>console.log(error));
  return ("Send otp success");
}

module.exports = {
  sendSMS
}