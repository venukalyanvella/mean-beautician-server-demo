const Beautician = require('../models/beautician.model');

const BEAUTYPARLOUR = require('../models/BeautyParlour.model');
const USER = require('../models/User.model');
var library = require('../library/userquery');
const bcrypt = require('bcrypt');

module.exports.addBeautician = async (request, response) => {

    console.log(request.body);
    const beauticianData = {
        parlour_id: request.body.parlour_id,
        beauticianName: request.body.beauticianName,
        experience: request.body.experience,
        mobilenumber: request.body.mobilenumber,
        contactMail: request.body.contactMail
    }

    // const salt = bcrypt.genSaltSync(10);
    //  const hashpassword = bcrypt.hashSync(request.body.password, salt);
    //  const encryptpassword = await library.encrypt(hashpassword, process.env.SECURITY_KEY);
    //  request.body.password = encryptpassword
    const userData = {
        username: request.body.username,
        email: request.body.contactMail,
        password: request.body.password,
        role: request.body.role,
        mobileNumber: request.body.mobilenumber
    }
    try {
        await Beautician.query().insert(beauticianData).then(
            (beautician) => {
                //console.log(beautician);
                USER.query().insert(userData).then(
                    (result) => {
                        return response.status(200).json({
                            success: true,
                            statusCode: 201,
                            message: `New Beautician Added`,
                            data: null
                        })
                    }
                ).catch(error => {
                    throw error
                })
            }
        ).catch((error) => {
            console.log(error, 'Failed to add beautician');
            return response.status(200).json({
                success: true,
                statusCode: 400,
                message: `Failed to Add Beautician`,
                data: null
            })
        })
    } catch (error) {
        console.log('Error while inserting beautician on server Error');
        return response.status(200).json({
            success: false,
            statusCode: 401,
            message: `Server Error on Adding Data`,
            data: null
        })
    }
}

module.exports.getAllBeauticians = async (request, response) => {

    console.log('Beauticians Post Request body',request.body);
    let result = {};
    let list = []
    let count = 0;
    try {
        let { page, limit, query } = request.body;
        page = (page - 1) * limit;
        //get beauticians list
        await Beautician.query()
            .select('beauty.*', 'bp.parlourName', 'bp.services', 'bp.place').alias('beauty')
            .innerJoin(`${BEAUTYPARLOUR.tableName} as bp`, 'bp.parlour_id', 'beauty.parlour_id')
            .whereRaw(`bp.parlourName  LIKE '%${query}%' OR bp.place LIKE '%${query}%' OR beauty.beauticianName LIKE '%${query}%'`)
            .limit(limit).offset(page)
            .then(async (beautician) => {
                // console.log(beautician);
                list = beautician;
                // console.log('beauticians list ',list);
            }).catch((Error) => {
                console.log('Failed to get Beauticians');
                throw Error
            })
        await Beautician.query().alias('beauty').count('* as totalRecords')
            .then(data => {
                //console.log(data);
                count = data[0].totalRecords
            }).catch(error => {
                throw error;
            })
        result = {
            success: true,
            error: false,
            message: 'all Beauticians Data',
            data: list,
            count: count
        }
        console.log(result);

    } catch (error) {
        console.log('Failed to get Beauticians on server', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Failed to load Beauticians',
            data: null
        }
    }
    return response.status(200).json(result)
}

module.exports.getbeaticianByID = (request, response) => {

}

module.exports.updateBeautician = async (request, response) => {

    let id = request.params.id;
    let result = {};
    try {

        await Beautician.query()
            .alias('beauty')
            .whereRaw(`id='${id}'`)
            .update({
                beauticianName: request.body.beauticianName,
                beautyparlourName: request.body.beautyparlourName,
                mobilenumber: request.body.mobilenumber,
                services: request.body.services,
                ratings: request.body.ratings,
                experience: request.body.experience,
                place: request.body.place


            })
            .then(
                data => {
                    console.log('Beautician data updated ', data);
                    result = {
                        success: true,
                        error: false,
                        statusCode: 200,
                        message: 'Beautician Data Updated Successfull'
                    }
                }
            ).catch(err => {
                throw err
            })


    } catch (error) {
        console.log('Error on api try catch update');

        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Error on api try catch update'
        }
    }

    return response.status(200).json(result)

}

module.exports.removeBeautician = async (request, response) => {
    let id = request.params.id;
    // console.log(request.params.id);
    let result = {};
    let message = '';

    try {
        await Beautician.query()
            .del()
            // .alias('bk')
            .whereRaw(`id='${id}'`)
            .then(data => {
                console.log('Beautician Removed', data);
                result = {
                    success: true,
                    error: false,
                    statusCode: 200,
                    message: 'Beautician Deleted successfull'
                }
            })
            .catch(error => {
                throw error;
            })
    } catch (error) {
        console.log('Error on try catch api error', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: 'Error on Deleting Beautician on Api',
            data: null
        }

    }
    return response.status(200).json(result)

}

