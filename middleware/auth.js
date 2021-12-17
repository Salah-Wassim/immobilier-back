const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        if(req.headers.autorization){
            const token = req.headers.autorization.split(" ")[1];
            try {
                if(jwt.verify(token, process.env.SECRET)){
                    next();
                }
                else{
                    res.status(401).json({
                        message: 'invalide / expired token'
                    })
                }
            } catch (error) {
                res.status(401).json({message: 'Access denied'})
            }
        }
        else{
            res.status(500).json({message: "Access denied"})
        }
    }
}