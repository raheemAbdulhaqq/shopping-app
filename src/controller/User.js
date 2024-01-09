const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require("../model/User")
const saltRounds = 10

dotenv.config()

let createUser = async (req, res) => {
    try {
        let { name, email, password, address, phoneNumber, } = req.body

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            phoneNumber,
        })

        //function for sending mail
        sendVerficationEmail(newUser)

        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "raheem31052001@gmail.com",
        pass: process.env.MAIL_PASSWORD
    }
})

let sendVerficationEmail = async (user) => {
    const verificationLink = `http://localhost:3000/user/verifyUser?token=${user.verificationToken}`

    const mailOptions = {
        from: "Shopping App <raheem31052001@gmail.com>",
        to: user.email,
        subject: "Verify your email address",
        text: `
        Hello ${user.name},
        
        Please click on the link below to verify your email address:
        
        ${verificationLink}
        
        If you did not create an account, please disregard this email.
        
        Thank You,
        
        The Shopping App Team
        `
    }
    try {
        transporter.sendMail(mailOptions)
        console.log("verfication mail sent")
    } catch (error) {
        console.error(error)
    }
}

module.exports = { createUser, }