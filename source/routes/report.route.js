
const express = require('express');
const router = express.Router();
const reportCtrl = require('../controllers/report.controller');

router.post('/add',reportCtrl.addReport);
router.patch('/update',reportCtrl.updateCheckup);

router.post('/myreports',reportCtrl.getCheckupDetails);
router.post('/reportByUser', reportCtrl.getReportByUser);


module.exports = router;