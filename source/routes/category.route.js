
const express = require('express');
const router = express.Router();
const category = require('../controllers/categories.controller');


router.post('/add',category.addCategory);
router.get('/getCategories',category.getAllCategories);
router.patch('/change',category.updateCategory);
router.delete('/del/:id',category.removeCategory);


module.exports = router