const crypto = require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { username, password } = request.body;
        const user = await connection('users')
            .where('username', username)
            .select('username', 'password')
            .first();

        if(!user){
            return response.status(400).json({ error: 'User or Password is wrong'})
        }
        const hash =  await bcrypt.compare(password, user.password);
        console.log(hash);
        if(!hash){
           return response.status(400).json({ error: 'User or Password is wrong'})
       }
        return response.json(user.username);
    }
}