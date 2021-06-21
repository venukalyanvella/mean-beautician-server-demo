

const {Model} = require('objection');

class BeautyServices extends Model {
    static get tableName(){
        return 'beauty_services'
    }
    static get idColumn(){
        return 'service_id'
    }
    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                service_id:{type:'integer'},
                category_id:{type:'string'},
                service_name:{type:['string',null]},
                amount:{type:['integer',null]},
                status:{type:'tinyint'},
                created_at:{type:'datetime'},
                updated_at:{type:'timestamp'}
            }
        }
    }
}

module.exports = BeautyServices