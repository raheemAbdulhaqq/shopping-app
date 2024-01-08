const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoutes = require("./routes/user")

const app = express()
const port = 3000

dotenv.config()

app.use(express.json())
app.use("/user", userRoutes)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected")
})

app.listen(port, () => {
    console.log("express server is running on 3000")
})

module.exports = app