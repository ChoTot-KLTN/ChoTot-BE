const nodeMailer = require("nodemailer");
const {
  ADMIN_EMAIL,
  ADMIN_EMAIL_PASSWORD,
  PORT_SEND_MAIL,
} = require("./Config");

const mailHost = "smtp.gmail.com";
const mailPort = PORT_SEND_MAIL;
console.log("Port send mail: ", mailPort);
console.log(ADMIN_EMAIL +ADMIN_EMAIL_PASSWORD );
const sendMail =async (to, subject, htmlContent) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: mailHost,
      port: mailPort,
      secure: true,
     
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_EMAIL_PASSWORD,
      },
    });
  
    const options = {
      from: ADMIN_EMAIL,
      to: to,
      subject: subject,
      html: htmlContent,
    };
  
    await  transporter.sendMail(options);
  }catch(error){
    console.log(error.message);
  }
  
};

module.exports = {sendMail};
