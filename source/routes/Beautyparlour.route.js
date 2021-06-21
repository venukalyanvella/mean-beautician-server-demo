
const express = require('express');
const router = express.Router();
const BeautyParlourCtrl = require('../controllers/beautyparlour.controller');


router.post('/getBeautparlour',BeautyParlourCtrl.getAllParlours);
router.post('/add',BeautyParlourCtrl.addBeautyParlour);
router.patch('/upparlour/:id',BeautyParlourCtrl.updateParlour);
router.delete('/delparlour/:id',BeautyParlourCtrl.RemoveParlour);
router.get('/allparlours',BeautyParlourCtrl.getAllParloursDetails)


module.exports = router