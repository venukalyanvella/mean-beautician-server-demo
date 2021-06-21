

const REPORT = require('../models/Report.model');
const BEAUTICIAN = require('../models/beautician.model');
const Appointment = require('../models/Appointment.model');
const library = require('../library/userquery');
const BOOKING = require('../models/Booking.model');
const USER = require('../models/User.model');

//GET CHECK UP DETAILS 

const getReportByUser =async (request,response,next)=>{

    let {user_id,page,limit} = request.body;
    let result={}
    let list =[]
    try {
        await REPORT.query().select('rp.*','app.appointmentID','app.date','app.description','app.issuedBy','user.*','bk.booking_id','beauty.beauticianName')
                            .alias('rp')
                            .innerJoin(`${Appointment.tableName} as app`,'app.id','rp.app_id')
                            .innerJoin(`${BOOKING.tableName} as bk`,'bk.book_id','app.book_id')
                            .innerJoin(`${BEAUTICIAN.tableName} as beauty`,'bk.BeauticianDetails','beauty.id')
                            .innerJoin(`${USER.tableName} as user`,'user.id','bk.user_id')
                            .whereRaw(`rp.user_id=${user_id}`)
                            .then(data=>{
                                list= data
                            })
                            .catch(err=>{
                                throw err
                            })
                            result ={
                                success:true,
                                error:false,
                                message:`User Reports`,
                                data:list

                            }

    } catch (error) {
        console.log('error on getting user reports',error);
        result = {
            success:false,
            error:true,
            message:'error on getting User Reports',
            data:null
        }
        
    }

    return response.status(200).json(result)
}


// LIST THE REPORT DETAILS FRO USER - GET/POST REQUEST

const getCheckupDetails = async (request,response,next)=>{

    let {limit,page,user,appointmentID}=request.body;

    let result ={}
    let list =[];
    let count =0;
    page = (page-1)* limit;
    try {
        await REPORT.query()
                    .select('report.*')
                    .alias('re')
                    .innerJoin(`${Appointment.tableName} as ap`,'ap.appointmentID','re.clientDetails')
                    .whereRaw(`re.appointmentID='${appointmentID}'`)
                    .limit(limit)
                    .offset(page)
                    .then(data=>{
                        this.list = data
                    })
                    .catch(error=>{
                        throw error
                    })

                    //count the reports

                    await REPORT.query().count('* as totalReports')
                    .whereRaw(`clientDetails='${user}'`)
                    .then(data=>{
                        this.count = data[0].totalReports
                    })
                    .catch(error=>{
                        throw error;
                    })

                    result ={
                        success:true,
                        error:false,
                        statusCode:200,
                        message:'User Reports',
                        data:list,
                        count:count
                    }
        

    } catch (error) {

        console.log('Error on try catch API Reports Get',error);

        result ={
            success:false,
            error:true,
            statusCode:500,
            message:'Error on try catch API Reports Get',
            data:null
        }
        
    }

    return response.status(200).json(result);


}

//ADD REPORT - POST REQUEST

const addReport = async (request,response,next)=>{
    console.log('request appointment Body', request.body);
    let result = {};
    let message='';
    let report_id = Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 5);
    let reportData={
        reportID:report_id,
        appointmentID:request.body.appointmentID,
        user_id:request.body.user_id,
        date:request.body.date,
        amount:request.body.amount,
        report:request.body.report,
        issuedBy:request.body.issuedBy

    }
    try {
        let status = await statusChecker(Appointment,'status',request.body.appointmentID)
        
      await REPORT.query()
                        .insert(reportData)
                         .then( async (data)=>{
                            console.log('Report created successfully');
                            await Appointment.query().patch({status:true}).whereRaw(`appointmentID='${request.body.appointmentID}'`).then(data=>{
                                console.log('Appointment Status updated');
                            }).catch(err=>{
                                throw err
                            })
                            result={
                                success:true,
                                error:false,
                                statusCode:201,
                                message:'Report generated And Appointment status Updated'
                            }

                    })
                    .catch(error=>{
                        throw error;
                    })

    } catch (error) {

        console.log('Error on try catch api report', error);
        result={
            success:false,
            error:true,
            statusCode:500,
            message:'Error On Try Catch Api report'
        }

        
    }

    return response.status(200).json(result)

    

}


//UPDATE CHECKUP - PATCH/PUT REQUEST

const updateCheckup = (request,response,next)=>{

}
async function statusChecker(model,column,data){
    let wherecon = `book_id = '${data}'`;
    let status = await library.simpleSelect(model,column,wherecon);
    // console.log(status);
    return status
}


module.exports = {
    addReport,
    getCheckupDetails,
    updateCheckup,
    getReportByUser
}