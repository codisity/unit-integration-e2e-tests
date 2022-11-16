const express = require("express")
const { sendEmail } = require("./libs/email")
const expressApp = express()

expressApp.use(express.json()) // Parses application/json requests body

expressApp.use("/", express.static("../frontend/build")) // Serves frontend app

expressApp.post("/api/user", async (req, res) => {
  try {
    const email = req.body.email.trim()
    const emailRegExp = /.+@.+\..+/
    if (!emailRegExp.test(email)) {
      return res.status(400).send({ error: "Nieprawidłowy adres email" })
    }

    await sendEmail({
      from: '"Tester 📨" <email@example.com>',
      to: email,
      subject: "Aktywacja konta",
      html: "Treść emaila aktywacyjnego",
    })

    return res.status(200).send({ success: "Wysłano email aktywacyjny" })
  } catch (error) {
    console.error(error)

    return res.status(500).send({ error: "Nieoczekiwany błąd" })
  }
})

module.exports = expressApp
