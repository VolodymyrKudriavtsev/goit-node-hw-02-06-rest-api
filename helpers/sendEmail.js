const nodemailer = require("nodemailer");

require("dotenv").config();

const {META_PASSWORD, META_USER} = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

// const emailOptions = {
//   from: "vova.ku@meta.ua",
//   to: "vladimirkud@ukr.net",
//   subject: "Nodemailer test",
//   html: `<p>Привіт. Ми тестуємо надсилання листів!</p>`,
// };

const sendEmail = async (data) => {
  const email = { ...data, from: META_USER };
  try {
    await transporter.sendMail(email);
    console.log("Email send success");
  } catch (error) {
    console.log(error.message);
  }
};

// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log(info))
//   .then(() => console.log("Email send success"))
//   .catch((err) => console.log(err.message));

module.exports = sendEmail;
