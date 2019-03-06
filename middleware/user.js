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

      /** Add User in Context */
    }

    return authResponse;
}

module.exports.verifyToken = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("authorization, event",event);

    // check header or url parameters or post parameters for token
    if (typeof event.authorizationToken === 'undefined') {
        callback('Unauthorized');
    }

    const token = event.authorizationToken

    /**
     * Authenticate User
     */
    db.User.findOne({ where: {token: token } })
        .then(res => {
            if(!res){
                callback('Unauthorized')
            }

            callback(null, generatePolicy(res.token, 'Allow', event.methodArn))
        })
        .catch(err => {
            callback('Unauthorized')
        })
};