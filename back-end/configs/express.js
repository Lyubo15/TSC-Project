const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {

    // Body Pareser
    const jsonParser = bodyParser.json()

    app.use(jsonParser)
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    // Cors security
    app.use(cors())

    app.use('/static', express.static('static'))
    // app.use('/public', express.static('public'))

    // Token accessability
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })
}