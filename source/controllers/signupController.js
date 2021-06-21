 require('dotenv').config();
 const User = require('../models/User.model');
 const {
     validate
 } = require('../models/User.model');
 var library = require('../library/userquery');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 // POST Request for new users
 module.exports.saveUser = async (request, response) => {

     const userData = request.body;
     const {
         error
     } = await validate(request.body);
     if (error) {
         return response.send(error.message)
     }
    //  const salt = bcrypt.genSaltSync(10);
    //  const hashpassword = bcrypt.hashSync(request.body.password, salt);
    //  const encryptpassword = await library.encrypt(hashpassword, process.env.SECURITY_KEY);
    //  request.body.password = encryptpassword
     try {
         await User.query().select('*').whereRaw(`email='${request.body.email}'`).then((user) => {
                 if (user.length === 0) {
                     User.query().insert(userData).then((lastid) => {
                             console.log(lastid);
                             console.log(`New '${request.body.role}'Registered successfully`);
                             return response.status(200).json({
                                 success: true,
                                 statusCode: 201,
                                 message: `New '${request.body.role}'Registered successfully`,
                                 data: null
                             })
                         })
                         .catch((error) => {
                             console.log(error);
                             return response.status(200).json({
                                 success: false,
                                 statusCode: 403,
                                 message: `Failed to Register`,
                                 data: null
                             })
                         })
                 } else {
                     // console.log(`User Already exist with this email id:'${request.body.email}'`);
                     return response.status(200).json({
                         success: false,
                         statusCode: 403,
                         message: 'User Already Exist With this email',
                         data: null
                     })
                 }
             })
             .catch((error) => {
                 console.log(error, 'error on server');
                 return response.status(200).json({
                     success: false,
                     statusCode: 403,
                     message: `Failed to Register user `,
                     data: null
                 })
             })
     } catch (error) {
         console.log(error, 'error on server api');
         return response.status(200).json({
             success: false,
             statusCode: 501,
             message: `Server Error`,
             data: null
         })
     }
 }

 module.exports.loginUser = async (request, response) => {

     if (request.body.username == '' && request.body.password == '') {
         return response.send('email/Password not be empty')
     }
     //checking user if exist or not
     const checkUser = await library.simpleSelect(User, '*', `username='${request.body.username}'`);
console.log(checkUser[0]);
    //  const decryptpassword = library.decrypt(checkUser[0].password, process.env.SECURITY_KEY);
     //returns true/false

    //  const isPassword = bcrypt.compareSync(request.body.password, decryptpassword);


     if (checkUser.length == 0) {
         return response.send('No Users Found With this Email-id')

     }
    //   else if (!isPassword) {
    //      return response.send('Incorrect Password')
    //  }
      else {
         const Credentials = {
             user_id:checkUser[0].id,
             username: checkUser[0].username,
             mobileNumber: checkUser[0].mobileNumber,
             email: checkUser[0].email,
             role: checkUser[0].role
         }
         const token = jwt.sign(Credentials, process.env.SECURITY_KEY, {
             algorithm: 'HS256',
             expiresIn: '1s'
         })
         return response.status(200).json({
             success: true,
             statusCode: 200,
             message: `Login as ${Credentials.role} Successfull`,
             data: Credentials,
             token: token
         })
     }
 }

 ///get profile

 module.exports.getProfile = async (request, response) => {

     if (!request.headers.authorization) {
         return response.send('Unauthorize Access')
     }

     const token = request.headers.authorization.split(' ')[1];
     if (token == null || token == '') {
         return response.status(401).send('Unauthorize Access')
     }
     var decoded = jwt.verify(token, process.env.SECURITY_KEY);
     if (!decoded) {
         return response.status(401).send('Unauthorize Access')
     }
     await library.simpleSelect(User, '*', `id = '${decoded.id}'`)
         .then((user) => {
             if (user) {
                 return response.status(200).send(user)
             } else {
                 return response.status(400).json({
                     success: false,
                     statusCode: 401,
                     message: `Failed to Get Profile Information`,
                     data: null
                 })
             }
         })
         .catch((error) => {
             return response.status(400).json({
                 success: false,
                 statusCode: 403,
                 message: `Failed to Get Profile Information on server`,
                 data: null
             })
         })

 }


