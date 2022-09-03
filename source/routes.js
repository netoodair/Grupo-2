const express = require('express');


const UserController = require('./Controllers/UserController');
const SessionController = require('./Controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.create)


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

module.exports = routes;