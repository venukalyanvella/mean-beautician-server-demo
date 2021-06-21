
const { Model} = require('objection');
var knexx = require('../config/knex');
const cryptoJS = require('crypto-js');



//encrypt
const encrypt = (text)=>{
    return cryptoJS.AES.encrypt(text,process.env.SECURITY_KEY).toString()
}

const decrypt = (text)=>{
    return cryptoJS.AES.decrypt(text,process.env.SECURITY_KEY).toString(cryptoJS.enc.Utf8)
}



///select query

let simpleSelect = (Model,column,where)=>{
    return new Promise((resolve,reject)=>{
        let query = knexx.knex.select(column).from(Model.tableName);
        if(where){
            query = query.whereRaw(where)
        }
        console.log(`final select query ${query.toQuery()}`);
        query.then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
    })
}


module.exports = {
 encrypt,decrypt,
    simpleSelect
}