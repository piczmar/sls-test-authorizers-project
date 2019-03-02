'use strict';

const db = require('../utils/db')

module.exports.users = (event, context, callback) => {  
  /**
   * Testing Response from Database
   */
  db.User.findAll({})
    .then(users => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                users,
            })
        }
    
        callback(null, response)
    })
    .catch(err => {
        const response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            })
        }
    
        callback(null, response)
    })
};

module.exports.user = (event, context, callback) => {
    const user = event.requestContext.authorizer.principalId

    /**
    * Testing Response
    */
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            user: user,
            // input: event,
        })
    }

    callback(null, response)
};