const express =require('express');
var router = express.Router();
const signUpCtrl = require('../controllers/signupController');


router.post('/register',signUpCtrl.saveUser);
router.post('/login',signUpCtrl.loginUser);
router.get('/myProfile',signUpCtrl.getProfile);



module.exports= router;