'use strict';

const db = require('../utils/db')

module.exports.users = (event, context, callback) => {  
    context.callbackWaitsForEmptyEventLoop = false;

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
        console.log('user:', err)

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
    context.callbackWaitsForEmptyEventLoop = false;
    const token = event.requestContext.authorizer.principalId

    db.User.findOne({where: {token: token }})
        .then(user => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    input: event,
                    user,
                })
            }

            callback(null, response)
        })
        .catch(err => {
            const response = {
                statusCode: 500,
                body: JSON.stringify({
                    err,
                })
            }

            callback(response)
        })
};