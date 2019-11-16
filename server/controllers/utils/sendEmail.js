const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendEmail = (reciver, message) =>
  transporter.sendMail({
    subject: " Roman Road London Application",
    from: `"Roman Road London" ${process.env.NODEMAILER_EMAIL}`,
    to: reciver,
    html: message // in html
  });

module.exports = sendEmail;
