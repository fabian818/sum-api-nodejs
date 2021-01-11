# Sum Api NodeJs
NodeJs api to auth and sum two numbers.

## Getting Started

### Prerequisites


```
NodeJs
Express Js
Docker
```

### Installing

Docker run the application with the following variables:

```
DB_USERNAME
DB_PASSWORD
DB_DATABASE
DB_HOST
CRYPTO_KEY
```

### Usage
```
# register into the application
POST /signup
body: 
{
    "username": "",
    "password": ""
}

=====================
# loggin into the application
POST /login
body: 
{
    "username": "",
    "password": ""
}
Response:
{
    "secret_token": ""
}

=====================
# insert sum operation by logged user
POST /sum?secret_token={}
body: 
{
    "first_number": 1,
    "second_number": 2
}

=====================
# get al sums by logged user
GET /sum?secret_token={}
```

## Deployment

Follow the instructions at [Sum Api Ansible](https://github.com/fabian818/sum-api-ansible)

## Integration

Continuous Integration with Github Actions, after each release an image is deployed to: [fabian818 Dockerhub](https://hub.docker.com/repository/docker/fabian818/sum-api-nodejs/).

## Built With

* [NodeJs](https://nodejs.org/) - Backend engine
* [Express](https://www.express.com/) - Used as web server infrstructure provider
* [Passport](http://www.passportjs.org/) - Used to auth in the application
* [Sequelize](https://sequelize.org/) - Used for ORM management


## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/fabian818/sum-api-nodejs/tags). 

## Authors

* **Fabian Peña** - *Initial work* - [fabian818](https://github.com/fabian818)

