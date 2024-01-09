const nodemailer = require('nodemailer');
const dotenv = require("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "raheem31052001@gmail.com",
        pass: process.env.MAIL_PASSWORD
    }
})

module.exports = {transporter}