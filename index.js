const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
const port = 3000

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected")
})

app.listen(port, () => {
    console.log("express server is running on 3000")
})