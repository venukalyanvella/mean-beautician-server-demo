

const {Model} = require('objection');

class Report extends Model{

    static get tableName(){
        return 'reports'
    }
    static get idColumn(){
        return 'id'
    }
    static get  jsonSchema(){
        return {
            type:'object',
            properties:{
                id:{type:'integer'},
                reportID:{type:'string'},
                app_id:{type:'integer'},
                user_id:{type:['integer',null]},
                date:{type:['date']},
                amount:{type:['string',null]},
                report:{type:['string',null]},
                issuedBy:{type:['string',null]},
                 created_at:{type:['datetime']},
                 updated_at:{type:['datetime']}
            }
        }
    }

}

module.exports = Report