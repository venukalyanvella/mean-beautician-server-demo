const { Model } =require('objection');
const Joi = require('joi');


class Booking extends Model {
    static get tableName(){
        return 'booking'
    }
    static get idColumn(){
        return 'bookingID'
    }
    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                book_id:{type:'integer'},
                booking_id:{type:['integer']},
                user_id:{type:['integer',null]},
                BeauticianDetails:{type:['integer',null]},
                date:{type:'date'},
                time:{type:'time'},
                bookingStatus:{type:'boolean'},
                created_at:{type:'datetime'},
                updated_at:{type:'timestamp'}
            }
        }
    }
}

// function validateBooking(data){

//     const schema = Joi.object().keys({


//     })
// return schema.validate

// }


module.exports = Booking
// module.exports.validateData = validateBooking

