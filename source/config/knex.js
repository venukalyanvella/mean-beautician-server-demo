require('dotenv').config();
const Knex = require('knex');
const knexConfig = require('./knexConfig');

const config = {
    knex: knexConfig,
    dbManager: {
        collate: ['latin1_swedish_ci'],
        superUser: process.env.DB_USER,
        superPassword: process.env.DB_PASSWORD
    }
};

const knex = Knex(config.knex);
const dbManager = require('knex-db-manager').databaseManagerFactory(config);

module.exports = {
    config,
    knex,
    dbManager
}