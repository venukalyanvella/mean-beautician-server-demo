
const BEAUTYPARLOUR = require('../models/BeautyParlour.model');


const addBeautyParlour = async (request, response, next) => {

    let result = {}


    try {

        await BEAUTYPARLOUR.query().insert(request.body)
            .then((data) => {
                console.log('Beauty parlour Added Successfully...');
                result = {
                    success: false,
                    statusCode: 500,
                    message: 'Beauty parlour Added Successfully...'

                }
            })
            .catch((error) => {
                throw error
            })
    } catch (error) {
        console.log('Error on adding Beauty Parlour', error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Error on Adding Beauty parlour',
            data: null
        }

    }

    return response.status(200).json(result);

}

const getAllParlours = async (request, response, next) => {

    let result = {}
    let list = []
    let { page,  limit } = request.body;
    page = (page - 1) * limit;
    let count = 0;

    try {

        await BEAUTYPARLOUR.query().select().alias('bp').limit(limit).offset(page)
            .then((data) => {
                    list = data
                console.log('Beauty parlour Getting Successfully...',data);
            })
            .catch((Error) => {
                throw Error
            })
        await BEAUTYPARLOUR.query().count('* as totalparlours')
            .then((data) => {
                count = data[0].totalparlours
                console.log(data[0].totalparlours);
            }).catch((error) => {
                throw error
            })

        result = {
            success: true,
            statusCode: 200,
            message: 'Beauty parlour Getting Successfully...',
            data: list,
            count: count
        }

    } catch (error) {
        console.log('Error on Getting Beauty Parlour', error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Error on Getting Beauty parlour',
            data: null
        }
    }

return response.status(200).json(result)
}

const updateParlour = async (request, response, next) => {

    let result = {};
    let id = request.params.id
    try {
        await BEAUTYPARLOUR.query().alias('bp').whereRaw(`bp.parlour_id='${id}'`)
            .update({
                parlourName: request.body.parlourName,
                ownername: request.body.ownername,
                lawfirmname: request.body.lawfirmname,
                services: request.body.services,
                contactMail: request.body.contactMail,
                place: request.body.place
            })
            .then((data) => {
                console.log('Beauty Parlour Updated Successfully...');

            })
            .catch((error) => {
                throw error
            })
        result = {
            success: true,
            statusCode: 201,
            message: 'Beauty Parlour Updated Successfully...',
            data: data
        }

    } catch (error) {
        console.log('Error on Try Catch Api Update Beauty Parlour.', error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Error on Try Catch Api Update Beauty Parlour.',
            data: null
        }

    }
    return response.status(200).json(result)

}

const RemoveParlour = async (request, response, next) => {

    let id = request.params.id;

    try {
        await BEAUTYPARLOUR.query().alias('bp').whereRaw(`bp.parlour_id='${id}'`)
            .del()
            .then((data) => {
                console.log('Beauty Parlour Removed/Deleted Successfull');
            })
            .catch((error) => {
                throw error
            })
        result = {
            success: true,
            statusCode: 200,
            message: 'Beauty Parlour Removed/Deleted Successfull',
            data: null
        }



    } catch (error) {
        console.log('Error on Removing beauty parlour ');
        result = {
            success: false,
            statusCode: 500,
            message: 'Error on Removing beauty parlour ',
            data: null
        }
    }
    return response.status(200).json(result)

}

const restoreParlour = async (request,response,next)=>{
    
}

const getAllParloursDetails=async(request,response,next)=>{
    let list = [];
    let result = {}
    try {

        await BEAUTYPARLOUR.query().select()
           
            .then((data) => {
                console.log('All Beauty parlours');
                this.list = data
                result = {
                    success: true,
                    statusCode: 200,
                    message: '',
                    data: data
                }
            })
            .catch((error) => {
                throw error
            })

    } catch (error) {
        console.log('Failed to get all Beauty parlours Api Error');
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to get all  Beauty Parlours Api Error',
            data: null
        }
    }

    return response.status(200).json(result)

}

module.exports = {
    addBeautyParlour,
    getAllParlours,
    updateParlour,
    RemoveParlour,
    restoreParlour,
    getAllParloursDetails
}