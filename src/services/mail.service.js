const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "BeeLog email verification",
    text: `Your email verification OTP is ${otp}. OTP is valid for 10 mins. Please do not share OTP to anyone.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent", info.response);
    }
  });
};

module.exports = sendOtpEmail
