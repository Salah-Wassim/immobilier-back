const jwt = require('jsonwebtoken');

function jwt_decode_realtor (req, res) {
    const header = req.headers.authorization;
    if(header){
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRETREALTOR, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message : "Le token est invalide"
                })
            }
            else{
                return res.status(200).json({
                    tokenDecoded : decoded
                })
            }
        })
    }
    else{
        return res.status(401).json({
            message : "Erreur d'authentification"
        })
    }
}

function jwt_decode_admin (req, res) {
    const header = req.headers.authorization;
    if(header){
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRETADMIN, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message : "Le token est invalide"
                })
            }
            else{
                return res.status(200).json({
                    tokenDecoded : decoded
                })
            }
        })
    }
    else{
        return res.status(401).json({
            message : "Erreur d'authentification"
        })
    }
}

module.exports = {
    jwt_decode_admin,
    jwt_decode_realtor
}