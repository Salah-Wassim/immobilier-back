const bcrypt = require('bcrypt')

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

module.exports = { verifyPassword }