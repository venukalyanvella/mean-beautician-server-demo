const APPOINTMENT = require('../models/Appointment.model');
const USER = require('../models/User.model');
const Booking = require('../models/Booking.model')

// ADD NEW APPOINTMENT - POST REQUEST

const addAppointment = async (request, response, next) => {

    console.log('request appointment Body', request.body);
    let result = {};
    let message = '';
    let ap_id = Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5);

    let appointDetails = {
        appointmentID: ap_id,
        clientDetails: request.body.clientDetails,
        date: request.body.date,
        description: request.body.description,
        issuedBy: request.body.issuedBy
    }

    try {
        await APPOINTMENT.query()
            .insert(appointDetails)
            .then(data => {
                console.log('appointment added successfully');
                result = {
                    success: true,
                    error: false,
                    statusCode: 201,
                    message: 'Appointment Confirmed '
                }
            })
            .catch(error => {
                throw error;
            })

    } catch (error) {

        console.log('Error on try catch api Appointment', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Error On Try Catch Api Appointment'
        }


    }

    return response.status(200).json(result)

}

//APPOINTMENT GET BY USER - GET/POST REQUEST

const appointmentGetByUser = async (request,response,next)=>{
let {user_id,limit,page} = request.body;
let result ={};
page = (page - 1) * limit
try {
    await APPOINTMENT.query()
        .select('user.username','ap.*')
                      .alias('ap')
                      .innerJoin(`${Booking.tableName} as bk`,'ap.book_id','bk.book_id')
                      .innerJoin(`${USER.tableName} as user`,'user.id','ap.user_id')
                      .limit(limit)
                      .offset(page)
                      .then(data=>{
                          console.log('user apoointments conformations');
                          result ={
                              success:true,
                              error:false,
                              statusCode:200,
                              message:'Appointment Details',
                              data:data
                          }
                      })
                      .catch(error=>{
                          throw  error
                      })
} catch (error) {
    console.log('Error on try catch API Get By User');
    result ={
        success:false,
        error:true,
        statusCode:500,
        message:'Error on User Appointments Details '
    }
}

return response.status(200).json(result)
}

//UPDATE APPOINEMENT - PATCH REQUEST

const updateAppointment = async (request, response, next) => {

    let {
        appoint_id
    } = request.params.id;
    let result = {};
    try {
        await APPOINTMENT.query()
            .update({
                date: request.body.date,
                description: request.body.description
            })
            .alias('ap')
            .whereRaw(`ap.appointmentID = '${appoint_id}'`)
            .then(data => {
                console.log('Appointment Updated');
                result = {
                    success: true,
                    error: false,
                    statusCode: 200,
                    message: 'Appointment Updated Successfully'
                }
            })
            .catch(error => {
                throw error;
            })
    } catch (error) {
        console.log('Error on Try Catch Api Update Appointment');
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Appointment Updated Failed',
            data: null
        }
    }
    return response.status(200).json(result)
}

//DELETE APPOINTMENT - DELETE REQUEST

const delAppointment = async (request, response, next) => {
    let appoint_id = request.params.id;
    let result = {};

    try {
        await APPOINTMENT.query()
            .del()
            .whereRaw(`appointmentID='${appoint_id}'`)
            .then(data => {
                console.log('Appointment Deleted successfully');
                result = {
                    success: true,
                    error: false,
                    statusCode: 200,
                    message: 'Appointment Deleted Successfully'
                }
            })
            .catch(error => {
                throw error
            })
    } catch (error) {
        console.log('Error on try Catch Api Delete appointment');
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Appointment Deleted Successfully'
        }
    }

    return response.status(200).json(result);
}


module.exports = {
    addAppointment,
    appointmentGetByUser,
    updateAppointment,
    delAppointment
}