const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD, EMAIL_FROM } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  try {
    await transporter.sendMail(email);
    // console.log("Email send success");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
