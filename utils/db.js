const Sequelize = require("sequelize")

/**
 * Database Credentials
 * =================================================
 * Imported from .evn file 
 * Create Free database at https://remotemysql.com/
 */

const connection = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, { 
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT
})

/**
 * Models
 */
const User = require('../models/User')(connection, Sequelize)

const db = {
    User,
    Sequelize,
    connection,
}

db.connection.sync();
  
module.exports = db;