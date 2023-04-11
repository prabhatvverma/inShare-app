// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const fileController = require("../controllers/uploadController")

// router.get('/',fileController.uploadFiles)
router.post('/', fileController.uploadFiles)

router.post('/send', fileController.sendMail);


module.exports = router;
