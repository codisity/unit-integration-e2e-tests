const expressApp = require("./expressApp")
const port = 3000

expressApp.listen(port, () => {
  console.log(`Server app started at http://localhost:${port}`)
})
