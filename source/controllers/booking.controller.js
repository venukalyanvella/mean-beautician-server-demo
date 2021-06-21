
const Booking = require('../models/Booking.model');

const library = require('../library/userquery');
const Appointment = require('../models/Appointment.model');
const Beautician = require('../models/beautician.model');
const BeautyPARLOUR = require('../models/BeautyParlour.model');
//sample records 

const checkIdserial = async (request,response,next)=>{

    try {
        
       

        await Booking.query().select('BeauticianDetails')
                    .orderBy('BeauticianDetails','desc')
                    
                    .then(data=>{
                               
                       })
                    .catch(error=>{
                        throw error;
                    })

    } catch (error) {
        console.log(error,'Error');
    }


}

//ADD BOOKING -API POST REQUEST

const addBooking = async(request,response,next)=>{

    console.log('Body is ' , request.body);
    let result = {};
    let message='';
  
    try {
        //add 
        await Booking.query()
                    .insert(request.body)
                    .then(data=>{
                        console.log('Add booking successfully');
                        
                        result={
                            success:true,
                            error:false,
                            statusCode:201,
                            message:'New Booking Added Successfully....',
                            }
                    })
                    .catch(error=>{
                        throw error;
                    })      
    } catch (error) {
        console.log('Error at try catch',error);
        result={
            success:false,
            error:true,
            statusCode:500,
            message:message || 'Error at try Catch api',
            data:null
            }
    }

    return response.status(200).json(result)
}

//GET BOOKINGS BY ID - POST REQUEST

const getBookingById = async (request,response,next)=>{

    let result ={};
    let message='';
//select booking * , beautician * from booking inner join beautician on booking.id = booking id ;

    try {
        let {booking_id}= request.body;
        await Booking.query()
                     .select('bk.*','bt.*')
                     .alias('bk')
                     .innerJoin(`${Beautician.tableName} as bt`,'bt.beautician_id','bk.beautician_id')
                     .whereRaw(`bk.booking_id='${booking_id}'`)
                     .then(data=>{
                        console.log('Get booking by Id isss', data);
                        result = {
                                success: true,
                                error: false,
                                statusCode: 200,
                                message: 'Get booking by Id successful',
                                data
                              }
                     })
                     .catch(error=>{
                         throw error;
                     })


    } catch (error) {
        console.log('Error at try catch');
        result={
            success:false,
            error:true,
            statusCode:500,
            message:message || 'Error at try Catch api',
            data:null
            }
    }
    return response.status(200).json(result)


}
//GET BOOKINGS BY USER - POST REQUEST

const getBookingsByUser = async (request,response,next)=>{
    console.log('Request body is ', request.body);
    let result ={};
    let message='';
    let list = [];
    let count = 0;
    try {
        let {user_id, page,limit}= request.body;

    page = (page-1) * limit

        await Booking.query()
                     .select('bk.*','bt.beauticianName','plr.parlourName')
                     .alias('bk')
                    .innerJoin(`${Beautician.tableName} as bt`,'bt.id','bk.BeauticianDetails')
                    .innerJoin(`${BeautyPARLOUR.tableName} as  plr`, 'plr.parlour_id','bt.parlour_id')
                     .whereRaw(`bk.user_id='${user_id}'`)
                     .limit(limit)
                     .offset(page)
                     .then(data=>{
                        console.log('Get booking by user', data);
                        list = data
                       
                     })
                     .catch(error=>{
                         throw error;
                     })
                     await Booking.query()
                     .alias('bk')
                     .count('* as totalBookings')
                    //  .innerJoin(`${Beautician.tableName} as bt`, 'bt.booking_id','bk.beautician_id')
                     .whereRaw(`bk.user_id = '${user_id}'`)
                     .then(data=>{
                        //  console.log(data.length);
                         count= data[0].totalBookings
                     })
                     .catch(error=>{
                         throw error
                     })
                     result = {
                         success: true,
                         error: false,
                         statusCode: 200,
                         message: 'Get bookings by user successful',
                         data: list,
                         count: count
                     }
    } catch (error) {
        console.log('Error at try catch',error);
        result={
            success:false,
            error:true,
            statusCode:500,
            message:message || 'Error at try Catch api',
            data:null
            }
    }
    return response.status(200).json(result)
}

//get bookings by beautician

const getBookingsByBeautician =async (request,response,next)=>{

    let result = {};
    let message='';
    let list = [];
    let count = 0;

    try {
        
        let {limit, page,query,beautician_id} = request.body;
        page = (page-1)* limit;

        await Booking.query()
                      .select('bk.*')
                      .alias('bk')
                      .whereRaw(`bk.BeauticianDetails = '${beautician_id}' AND bk.bookingStatus = 0`)
                      .then(data=>{
                        list= data
                      })
                      .catch(error=>{
                          throw error;
                      })

                      //get list count
                      await Booking.query()
                                    .count('* as totalBookings')
                                    .alias('bk')
                                    // .innerJoin(`${Beautician.tableName} as bt`, 'bt.booking_id','bk.beautician_id')
                                    .whereRaw(`bk.BeauticianDetails = '${beautician_id}'`)
                                    .then(data=>{
                                        // console.log(data[0].totalBookings);
                                        count= data[0].totalBookings
                                    })
                                    .catch(error=>{
                                        throw error
                                    })
                                    result = {
                                        success: true,
                                        error: false,
                                        statusCode: 200,
                                        message: 'Get bookings by beautician successful',
                                        data: list,
                                        count: count
                                    }


    } catch (error) {
        console.log('Api error try catch',error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Error on try catch api '
        }
    }

    return response.status(200).json(result);

}

//UPDATE BY ID -PATCH REQUEST

const updateBookingById = async(request,response,next)=>{

    let booking_id = request.body.id;
    console.log(request.body);
    let result ={};
    let message='';
    try {
        await Booking.query()
                    .whereRaw(`booking_id='${booking_id}'`)
                     .update({
                         date:request.body.date,
                         time:request.body.time
                     })
                     .then(data=>{
                            console.log('Booking data updated ',data);
                            result ={
                                success:true,
                                error:false,
                                statusCode:200,
                                message:'Booking Data Updated Successfull'
                            }
                     })
                     .catch(error=>{
                         throw error
                     })

    } catch (error) {
            console.log('Error on try catch Api update');
            result={
                success:false,
                error:true,
                statusCode:500,
                message:'Error on try catch API Update',
                data:null
            }
    }

    return response.status(200).json(result)

}

//UPDATE STATUS BY BEAUTICIAN
const statusModifier = async (request,response,next)=>{
 
    // console.log(request.body.book_id);
    let book_id= request.body.book_id;
    let result= {};
    let message = '';
    let ap_id = Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5);
    let appointDetails = {
        appointmentID: ap_id,
        book_id: request.body.book_id,
        user_id:request.body.user_id,
        date: request.body.date,
        time:request.body.time,
        description: request.body.description,
        issuedBy: request.body.issuedBy
    }
   try {
    let status = await statusChecker(Booking,'bookingStatus',book_id);
    if(status[0].bookingStatus == 0){
        await Booking.query()
                      .patch({bookingStatus:true})
                      .whereRaw(`book_id='${book_id}'`)
                      .then(data=>{
                          console.log('Booking Status Updated',data);
                          Appointment.query().insert(appointDetails)
                                        .then(data=>{
                                            result={
                                                success:true,
                                                error:false,
                                                statusCode:200,
                                                message:'Booking Status Updated & New Appointment Added.'
                                            }
                                        })
                                        .catch(err=>{
                                            throw err
                                        })
                        //   result={
                        //       success:true,
                        //       error:false,
                        //       statusCode:200,
                        //       message:'Booking Status Updated'
                        //   }
                      })
                      .catch(error=>{
                          throw error
                      })
                      result={
                        success:true,
                        error:false,
                        statusCode:200,
                        message:'Booking Status Updated & New Appointment Added.'
                    }
    }
   } catch (error) {
       console.log('Error on try catch API Status Update');
       result={
           success:false,
           error:true,
           statusCode:500,
           message:'Error on Try Catch Api Status Update',
           data:null
       }
   }

   return response.status(200).json(result)

}

//DELETE/REMOVE BOOKING - DELETE REQUEST

const deleteBooking = async (request,response,next)=>{

    let booking_id = request.params.id;
    // console.log(request.params.id);
    let result = {};
    let message='';

    try { 
        await Booking.query()
                        .del()
                        // .alias('bk')
                        .whereRaw(`booking_id='${booking_id}'`)
                        .then(data=>{
                            console.log('Booking Removed',data);
                            result={
                                success:true,
                                error:false,
                                statusCode:200,
                                message:'Booking data Deleted successfull'
                            }
                        })
                        .catch(error=>{
                            throw error;
                        })
    } catch (error) {
        console.log('Error on try catch api error',error);
        result={
            success:false,
            error:true,
            statusCode:500,
            message:'Error on Deleting Booking on Api',
            data:null
        }
        
    }
    return response.status(200).json(result)

}

//status check

async function statusChecker(model,column,data){
    let wherecon = `book_id = '${data}'`;
    let status = await library.simpleSelect(model,column,wherecon);
    // console.log(status);
    return status
}

module.exports = {
    addBooking,
    getBookingById,
    getBookingsByBeautician,
    getBookingsByUser,
    updateBookingById,
    statusModifier,
    deleteBooking,
    checkIdserial
}