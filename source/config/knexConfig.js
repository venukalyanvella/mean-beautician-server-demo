
require('dotenv').config();

module.exports = {
    client:'mysql',
    connection:{
        host:process.env.HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:3305,
        chartset:'utf8'
    },
    pool:{
        max:10,
        min:3
    },
    acquireTimeout:60*1000
}

