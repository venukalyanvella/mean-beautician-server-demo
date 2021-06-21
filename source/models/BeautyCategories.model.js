
const { Model} = require('objection');

class BeautyCategories extends Model {
    static get tableName(){
        return 'beautyservice_category'
    }
    static get idColumn(){
        return 'id'
    }

    static get jsonSchema(){
        return {
            type:'object',
            properties:{
                id:{type:'integer'},
                category_name:{type:['string',null]},
                status:{type:'tinyint'},
                created_at:{type:'datetime'},
                updated_at:{type:'timestamp'}
            }
        }
    }
}

module.exports = BeautyCategories