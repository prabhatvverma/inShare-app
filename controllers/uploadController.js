const { error } = require('console');
const multer = require('multer');
const path = require('path');
const File = require('../models/files')
const { v4: uuid4 } = require('uuid')


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
        console.log(file);
    }
})

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 }//
}).single('myfile');

class uploadFileController {
    async uploadFiles(req, res, next) {
        upload(req, res, async (err) => {
            /**---------------------------------------------validation----------------- */
            // console.log(req.body);
            if (!req.file) {
                // console.log("hello");
                return res.json({ error: "Add Valid File pls" })
            }
            /**------------------------storing data to database------------------------ */
            if (err) {
                return res.status(5000).send({ error: err.message })
            }
            /* ------------------------------storing data into database----------------- */
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size,
            });

            const response = await file.save();
            // console.log(response);
            res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
        })

    }

    async sendMail(req, res) {
        const { uuid, emailTo, emailFrom } = req.body;
        //validate request
        if (!uuid || !emailTo || !emailFrom) {
            return res.status(422).send({ error: "All fields are required" })
        }

        ///geting data from database

        const file = await File.findOne({ uuid: uuid });
        console.log(file);
        if (file.sender) {
            return res.status(422).send({ error: "Email already send" })
        }
        file.sender = emailFrom;
        file.receiver = emailTo;
        const response = await file.save();
        ///send email

        const sendMail = require("../services/emailService");
        sendMail({
            from: emailFrom,
            to: emailTo,
            subject: 'Inshare file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: require('../services/emailTemplet')({
                emailFrom: emailFrom,
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
                size: `${file.size / 1000} Kb`,
                expires: '24 hrs'
            })
        })
    }
}


module.exports = new uploadFileController;