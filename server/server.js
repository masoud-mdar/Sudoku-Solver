const express = require("express")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello !")
})

app.use((req, res, next) => {
    res.status(404)
    .type("text")
    .send("Not Found")
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})