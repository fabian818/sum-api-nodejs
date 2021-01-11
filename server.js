const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const routes = require('./app/routes')

const app = express()

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'Sum API',
            title: 'Sum API',
            version: '1.0.3',
        },
        host: 'localhost:8080',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http'],
    },
    basedir: __dirname, //app absolute path
    files: ['./app/routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
require('./app/auth/auth')

app.use(bodyParser.json())
app.use(routes)

const PORT = 8080

app.listen(PORT, function () {
  console.log(`App listening on ${PORT}`)
})
