const router = require('express').Router();
const downloadFileControleer = require('../controllers/downloadFileControleer');


router.get('/:uuid', downloadFileControleer.downloadFile);



module.exports = router;