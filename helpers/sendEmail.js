const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vova.ku@meta.ua",
    pass: process.env.META_PASSWORD,
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
  const email = { ...data, from: "vova.ku@meta.ua" };
  // try {

  // } catch (error) {

  // }
  await transporter.sendMail(email);
};

// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log(info))
//   .then(() => console.log("Email send success"))
//   .catch((err) => console.log(err.message));

module.exports = sendEmail;
