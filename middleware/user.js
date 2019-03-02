"use strict"

const db = require('../utils/db')

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}

module.exports.verifyToken = (event, context, callback) => {
    // check header or url parameters or post parameters for token
    if (typeof event.authorizationToken === 'undefined') {      
        callback('Unauthorized');
    }

    const token = event.authorizationToken
    
    /**
     * Authenticate User
     */
    db.User.findOne({ where: {token: token } })
        .then(user => {
            callback(null, generatePolicy(user, 'Allow', event.methodArn))
        })
        .catch(err => {
            callback('Unauthorized');
        })
};