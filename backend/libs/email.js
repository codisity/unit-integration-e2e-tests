const { createTransport } = require("nodemailer")
const { htmlToText } = require("nodemailer-html-to-text")
require("dotenv").config()

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Generate text version of email automatically, based on HTML content
transporter.use("compile", htmlToText())

async function sendEmail({ from, to, subject, html }) {
  switch (process.env.NODE_ENV) {
    case "e2e": {
      console.log({ from, to, subject, html })
      // Also, can be useful for testing: https://ethereal.email/
      break
    }
    default: {
      await transporter.sendMail({ from, to, subject, html })
      break
    }
  }
}

module.exports = {
  sendEmail,
}
