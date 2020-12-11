require('dotenv').config()

const express = require('express');
const app = express();

// DB Connection
require('./configs/database')

// Set Config
require('./configs/express')(app)

// Set Routers
require('./dispatcher')(app)

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}! Now its up to you...`));