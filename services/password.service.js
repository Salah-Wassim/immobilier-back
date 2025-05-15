const bcrypt = require('bcrypt')
const Admin = require('../models').Admin;
const AgentImmobilier = require('../models').AgentImmobilier;
const constante = require('../utils/constantes')

async function verifyPassword(password){
    try {
        if(password.length > 8){
            return bcrypt.hash(password, constante.SALT_HASH_KEY);
        }
        else{
            return false;
        }
    } catch (error) {
        return false;
    }
}

async function isPasswordUses(plainPassword){
    try{
        const admins = await Admin.findAll({attributes : ['id', 'password']})
        const realtors = await AgentImmobilier.findAll({attributes : ['id', 'password']})
    
        const allUsers = [...admins, ...realtors]

        const passwordChecks = await Promise.all(
            allUsers.map(user => bcrypt.compare(plainPassword, user.password))
        );

        const isPasswordUsed = passwordChecks.includes(true)

        return isPasswordUsed
    }
    catch(err){
        console.error(err);
        return false;
    }
}

module.exports = { verifyPassword, isPasswordUses }