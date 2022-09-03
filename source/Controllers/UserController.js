const crypto = require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
     async index(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },


    async create(request, response) {
        const {
            username,
            password
        } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
        const hash = await bcrypt.hash(password, 10);
        console.log(connection);
        
        await connection('users').insert({username, id, password:hash});
        
        return response.json({id});
    }




};