
const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointment.controller');

//ROUTES

router.post('/add',appointmentCtrl.addAppointment);
router.post('/appointment',appointmentCtrl.appointmentGetByUser);
router.patch('/update',appointmentCtrl.updateAppointment);
router.delete('/delete/:id',appointmentCtrl.delAppointment);


module.exports= router