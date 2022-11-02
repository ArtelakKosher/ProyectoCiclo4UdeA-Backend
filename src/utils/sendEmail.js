const { SchemaTypeOptions } = require("mongoose");
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "48faa27f3e8843",
      pass: "a8e94743d4d453",
    },
  });

  const message = {
    from: "Artelak <noreply@artelak.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
};

module.exports = sendEmail;
