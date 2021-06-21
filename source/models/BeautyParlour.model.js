
const {Model} = require('objection');

class BeautyParlour extends Model {
    static get tableName(){
        return 'beauty_parlour'
    }
    static get idColumn(){
        return 'parlour_id'
    }

    static get jsonSchema(){
        return{
            type:'object',
            properties:{
                parlour_id:{type:'integer'},
                parlourName:{type:['string',null]},
                ownername:{type:['string',null]},
                lawfirmname:{type:['string',null]},
                services:{type:['string',null]},
                contactMail:{type:['string',null]},
                place:{type:['string',null]},
                status:{type:'tinyint'},
                created_at:{type:'datetime'},
                updated_at:{type:'timestamp'}

            }
        }
    }
}



module.exports = BeautyParlour
