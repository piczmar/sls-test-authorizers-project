const Sequelize = require("sequelize")

/**
 * Database Credentials
 */
const user = "MG9UqpUAkN"
const password = "OyFVmriRzm" 
const database = "MG9UqpUAkN"
const dialect = "mysql"
const host = "remotemysql.com"

const connection = new Sequelize(database, user, password, { host, dialect })

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