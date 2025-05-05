const bcrypt = require('bcrypt')
const Admin = require('../models').Admin;
const AgentImmobilier = require('../models').AgentImmobilier;

async function verifyPassword(password){
    try {
        if(password.length > 8){
            return bcrypt.hash(password, 10);
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

        const passwordChecks = allUsers.map(user => 
            bcrypt.compare(plainPassword, user.password)
        );
    
        const isPasswordUsed = await Promise.any(passwordChecks)
        .then(() => true)
        .catch(() => false)

        return isPasswordUsed
    }
    catch(err){
        console.error(err);
        return false;
    }
}

module.exports = { verifyPassword, isPasswordUses }