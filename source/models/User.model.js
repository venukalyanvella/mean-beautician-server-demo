const {Model } = require('objection');
const Joi = require('joi');


class User extends Model {
    static get tableName(){
        return 'users'
    }
    static get idColumn(){
        return 'id'
    }
    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                id:{type:['integer']},
                email:{type:['string',null]},
                password:{type:['string',null]},
                username:{type:['string',null]},
                mobileNumber:{type:['integer',null]},
                active:{type:['boolean']},
                role:{type:['string',null]}
            }
        }
    }
}

function  ValidateUser(data) {

    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required(),
        username:Joi.string().min(3).required(),
        mobileNumber:Joi.string().min(10).max(10).required(),
        role:Joi.string()
        
    })

    return schema.validate(data)
}


module.exports = User;

module.exports.validate = ValidateUser