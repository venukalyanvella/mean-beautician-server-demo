const express = require('express');
let router = express.Router();
const beauticianCtrl = require('../controllers/beautician.controller');



router.post('/beauticians', beauticianCtrl.getAllBeauticians);
router.get('/beauticianById/:id', beauticianCtrl.getbeaticianByID);
router.post('/beautician',beauticianCtrl.addBeautician);
router.patch('/up/:id',beauticianCtrl.updateBeautician);
router.delete('/rm/:id', beauticianCtrl.removeBeautician);

module.exports = router;
