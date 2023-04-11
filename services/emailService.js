const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_USER_PASSWORD
        }
    })

    const info = await transporter.sendMail({
         from: ` inShare < ${from}>`, 
        /* to: to */ to,
        /* subject: subject */ subject,
        /* text: text */ text,
        /* html: html */ html
    })
    console.log(info);
}

module.exports = sendMail;