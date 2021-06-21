
const BEAUTYSERVICE = require('../models/BeautyServices.model');


const addSerrvice = async (request,response,next)=>{
    let result = {}

    try {

        await BEAUTYSERVICE.query().insert(request.body)
            .then(data => {
                console.log('New Beauty Servies added');
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'New Beauty Servies Added',
                    data: data
                }
            })
            .catch((Error) => {
                throw Error
            })


    } catch (error) {
        console.log('Error on try catch Api Adding Beauty Servies ',error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to Adding Beauty Servies ',
            data: null
        }
    }
    return response.status(200).json(result)
}

const getAllServices =async (request,response,next)=>{
    let list = [];
    let result = {}
    try {

        await BEAUTYSERVICE.query().select()
           
            .then((data) => {
                console.log('All Beauty Services', data);
                this.list = data
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'All Beauty Services',
                    data: data
                }
            })
            .catch((error) => {
                throw error
            })

    } catch (error) {
        console.log('Failed to get all Beauty Services Api Error');
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to get all  Beauty Services Api Error',
            data: null
        }
    }

    return response.status(200).json(result)
}

const upServices = async (request,response,next)=>{

}

const rmServices = async (request,response,next)=>{
    let id = request.params.id;
    let result = {}
    try {

        await BEAUTYSERVICE.query()
            .whereRaw(`service_id='${id}'`)
            .del()
            .then((data) => {
                console.log('BEauty Services Deleted Successfully');
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'BEauty Services Deleted Successfully',
                    data: null
                }
            })
            .catch((Error) => {
                throw Error
            })
    } catch (error) {
        console.log('Failed to Delete Beauty Services Api Error',error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to Delete Beauty Services Api Error',
            data: null
        }
    }
    return response.status(200).json(result)
}

module.exports ={
    addSerrvice,
    getAllServices,
    upServices,
    rmServices
}