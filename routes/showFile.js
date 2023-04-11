const router= require('express').Router();
const showFileController = require('../controllers/showFileController');


router.get('/:uuid', showFileController.showFile);



module.exports = router;