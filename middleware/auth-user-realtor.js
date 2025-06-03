const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization
        
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(403).json({message : "Token invalide ou manquant"})
        }

        if(authHeader){
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.SECRETREALTOR, (err, user) => {
                if(err || !user){
                    return res.status(401).json({
                        message: 'invalide / expired token'
                    })
                }

                if(user.role === "admin"){
                    res.status(401).json({message : "Les administrateurs ne sont pas authorisés"})
                }
                
                req.user = user
                next()
            })
        }
        else{
            return res.status(500).json({message: "Une erreur s'est produite"})
        }
    }
}