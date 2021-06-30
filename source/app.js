
//require dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql')
var app = express();
const path = require('path');
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

app.use(express.static(path.join(__dirname, '../public')));
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
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// })
app.get('/connect',(req,res)=>{
    var connection = mysql.createConnection({
        host:process.env.HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:3305
    })
    connection.connect((err,data)=>{
        
            if (err) {
                res.status(200).json({
                    message:'Failed to connect Database,Please Check Connection',
                    data:err
                });
                console.log('Error on connecting database');
            }else{
                console.log("Connected!");
                res.status(200).json({
                    success:true,
                    message:'Database Connected'
                }) 
            }
            
         
    })
})
// app.get('/api',(req,res)=>{
//    res.sendFile(path.join(__dirname+'/views/index.html'));

// });

app.use('/user',userRoute);
app.use('/booking',bookingRoute);
app.use('/beautician',beauticianRoute);
app.use('/appointment',appointmentRoute);
app.use('/report',reportCtrl);
app.use('/category',CategoriesRoute);
app.use('/beautyservice',BeautyServiceRoute);
app.use('/beautyparlour',BeautyParlourRoute);


//server

app.listen(port,()=>{
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
})

