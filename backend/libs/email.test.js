const { createTransport } = require("nodemailer")
let { htmlToText } = require("nodemailer-html-to-text")
const { sendEmail } = require("./email")

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    use: jest.fn(),
    sendMail: jest.fn(),
  }),
}))

jest.mock("nodemailer-html-to-text", () => ({
  htmlToText: jest.fn().mockReturnValue(jest.fn()),
}))

test("uses nodemailer properly", async function () {
  const transporter = createTransport()
  const transporterData = {
    auth: {
      user: expect.any(String),
      pass: expect.any(String),
    },
    host: expect.any(String),
    port: expect.any(String),
  }
  const emailData = {
    from: "from@email.com",
    to: "to@email.com",
    subject: "Email subject",
    html: "<p>HTML content</p>",
  }

  sendEmail(emailData)

  expect(createTransport).toBeCalledWith(transporterData)
  expect(transporter.sendMail).toBeCalledWith(emailData)

  expect(htmlToText).toBeCalled()
  // expect(transporter.use).toBeCalledWith("compile", htmlToText)
  expect(transporter.use).toBeCalledWith("compile", expect.any(Function))
})
