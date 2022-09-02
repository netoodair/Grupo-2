const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');
const bcrypt = require('bcrypt');

const routes = express.Router();

routes.get('/users', async (request, response) =>{
    const users = await connection('users').select('*');

    return response.json(users);
});

routes.post('/users', async (request, response) => {
    const {
        username,
        password
    } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    const hash = await bcrypt.hash(password, 10);
    
    console.log(connection);
    
    await connection('users').insert({username, id, password:hash});
    
    return response.json({id});
});

module.exports = routes;