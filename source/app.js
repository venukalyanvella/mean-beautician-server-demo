
//require dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
var app = express();
const port = process.env.PORT || 8080;
const knex = require('knex')
const knexx = require('./config/knex')
const {Model } = require('objection');
Model.knex(knexx.knex);
const userRoute = require('./routes/user.route');
const bookingRoute = require('./routes/booking.route');
const beauticianRoute = require('./routes/beautician.route');
const appointmentRoute = require('./routes/appointment.route');
const reportCtrl = require('./routes/report.route');
const CategoriesRoute = require('../source/routes/category.route');
const BeautyServiceRoute = require('../source/routes/beautyService.route');
const BeautyParlourRoute = require('../source/routes/Beautyparlour.route');
//middlewares


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//routes

app.get('/api',(req,res)=>{
    res.send('this is sample api test call')
});

app.use('/api/user',userRoute);
app.use('/api/booking',bookingRoute);
app.use('/api/beautician',beauticianRoute);
app.use('/api/appointment',appointmentRoute);
app.use('/api/report',reportCtrl);
app.use('/api/category',CategoriesRoute);
app.use('/api/beautyservice',BeautyServiceRoute);
app.use('/api/beautyparlour',BeautyParlourRoute);
//server

app.listen(port,()=>{
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
})

