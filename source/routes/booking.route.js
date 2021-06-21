const express =require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/booking.controller');


router.post('/add',bookingCtrl.addBooking);
router.get('/findByid', bookingCtrl.getBookingById);
router.post('/beauticianId',bookingCtrl.getBookingsByBeautician)
// router.get('/bookings', bookingCtrl.getAllBookings);
router.post('/status', bookingCtrl.statusModifier);
router.post('/getByUser',bookingCtrl.getBookingsByUser);
router.patch('/update', bookingCtrl.updateBookingById)
router.delete('/remove/:id', bookingCtrl.deleteBooking);

router.post('/sampledata',bookingCtrl.checkIdserial)

module.exports = router;
