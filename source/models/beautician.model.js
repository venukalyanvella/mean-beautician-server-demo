
const { Model } =require('objection');
const Joi = require('joi');

class Beautician extends Model {
    static get tableName(){
        return 'beautician'
    }
    static get idColumn(){
     return 'id'   
    }
    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                id:{type:['integer']},
                parlour_id:{type:['string']},
                beauticianName:{type:['string',null]},
                experience:{type:['string',null]},
                mobilenumber:{type:['integer',null]},
                contactMail:{type:'string'},
                status:{type:'tinyint'},
                created_at:{type:'datetime'},
                updated_at:{type:'timestamp'}
            }
        }
    }
}

module.exports = Beautician