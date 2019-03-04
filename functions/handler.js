'use strict';

const serverless = require('serverless-http')
const express = require('express')
const db = require('../utils/db')
const app = express()

/**
 * Routes
 */
app.get('/numu-family/user', (req, res) => {
    const token = req.body.auth

    db.User.findOne({where: {token: token}})
        .then(user => res.status(200).send(user))
        .catch(err => res.send(`Get All Users - Error: ${err}`))
})

app.get('/numu-family/users', (req, res) => {
    db.User.findAll({})
        .then(users => res.status(200).send(users))
        .catch(err => res.send(`Get All Users - Error: ${err}`))
})

module.exports.index = serverless(app, {
    /* Adding Authenticated User token to request body object */
    request: (request, event, context) => (request.body.auth = event.headers.Authorization)
});