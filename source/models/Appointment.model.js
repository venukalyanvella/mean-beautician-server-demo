
const {Model} = require('objection');

class Appointment extends Model{
    static get tableName(){
        return 'appointment'
    }
    static get idColumn(){
        return 'id'
    }
    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                id:{type:'integer'},
                appointmentID:{type:['string',null]},
                book_id:{type:'integer'},
                user_id:{type:'integer'},
                date:{type:'date'},
                time:{type:'date'},
                description:{typpe:['string',null]},
                issuedBy:{type:'string'}
            }
        }
    }
}

module.exports = Appointment