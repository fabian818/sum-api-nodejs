const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('passport')

const app = express()
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
require('./auth/auth')

app.use(bodyParser.json())
app.use(routes)

const PORT = 3000


app.listen(PORT, function () {
  console.log(`App listening on ${PORT}`)
})
