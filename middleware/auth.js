const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization
        console.log("authHeader", authHeader)
        if(authHeader){
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.SECRETADMIN, (err, admin) => {
                if(err){
                    return res.status(401).json({
                        message: 'invalide / expired token'
                    })
                }
                else{
                    req.admin = admin
                    next()
                }
            })
        }
        else{
            return res.status(500).json({message: "Access denied"})
        }
    }
}