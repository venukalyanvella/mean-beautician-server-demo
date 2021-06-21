
const BEAUTYCATEGORIES = require('../models/BeautyCategories.model');

const addCategory = async (request, response, next) => {

    let result = {}

    try {

        await BEAUTYCATEGORIES.query().insert(request.body)
            .then(data => {
                console.log('New Category added');
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'New Category Added',
                    data: data
                }
            })
            .catch((Error) => {
                throw Error
            })


    } catch (error) {
        console.log('Error on try catch Api Adding Category ');
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to Add Category ',
            data: null
        }
    }
    return response.status(200).json(result)
}

const getAllCategories = async (request, response, next) => {
    let list = [];
    let result = {}
    try {

        await BEAUTYCATEGORIES.query().select()
            .alias('bc')
            .then((data) => {
                console.log('All Categories', data);
                this.list = data
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'ALl Categories',
                    data: data
                }
            })
            .catch((error) => {
                throw error
            })

    } catch (error) {
        console.log('Failed to get all Categories Api Error');
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to get all Categories Api Error',
            data: null
        }
    }

    return response.status(200).json(result)
}

const updateCategory = (request, response, next) => {

}

const removeCategory = async (request, response, next) => {
    let id = request.params.id;
    let result = {}
    try {

        await BEAUTYCATEGORIES.query()
            .whereRaw(`id='${id}'`)
            .del()
            .then((data) => {
                console.log('Category Deleted Successfully');
                result = {
                    success: true,
                    statusCode: 200,
                    message: 'Category Deleted Successfully',
                    data: null
                }
            })
            .catch((Error) => {
                throw Error
            })


    } catch (error) {
        console.log('Failed to Delete Categories Api Error',error);
        result = {
            success: false,
            statusCode: 500,
            message: 'Failed to Delete Categories Api Error',
            data: null
        }
    }
    return response.status(200).json(result)
}

module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    removeCategory
}