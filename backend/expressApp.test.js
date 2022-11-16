const request = require("supertest")
const app = require("./expressApp")
let { sendEmail } = require("./libs/email")

jest.mock("./libs/email", () => ({
  sendEmail: jest.fn().mockReturnValue(Promise.resolve()),
}))

// Integration test (happy path)
test("calls /api/user with valid email", async function () {
  const response = await request(app)
    .post("/api/user")
    .set("Content-type", "application/json")
    .send({ email: "mocked@email.com" })

  expect(sendEmail).toBeCalledWith({
    from: '"Tester 📨" <email@example.com>',
    html: "Treść emaila aktywacyjnego",
    subject: "Aktywacja konta",
    to: "mocked@email.com",
  })

  expect(response.body.success).toEqual("Wysłano email aktywacyjny")
})
