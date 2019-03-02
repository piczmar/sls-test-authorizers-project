'use strict';

const db = require('../utils/db')

module.exports.hello = (event, context, callback) => {
  /**
   * Testing Response
   */
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //       input: event,
  //   })
  // }

  // callback(null, response)
  
  /**
   * Testing Response from Database
   */
  db.User.findAll({})
    .then(business => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                business,
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
