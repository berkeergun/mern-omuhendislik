// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer"

export const sendEmail = async(mailOptions) => {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            // user: process.env.SMTP_USER,
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    });

    let info = transporter.sendMail(mailOptions);

    // console.log(info);
}

// module.exports = sendEmail;