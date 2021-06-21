
const express = require('express');
const router = express.Router()
const beautyServiceCtrl = require('../controllers/beautyservices.controller');


router.post('/add',beautyServiceCtrl.addSerrvice);
router.get('/getAllServices',beautyServiceCtrl.getAllServices);
router.patch('/up/:id',beautyServiceCtrl.upServices);
router.delete('/rmservice/:id',beautyServiceCtrl.rmServices);


module.exports = router