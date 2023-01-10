const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {
            if(err){
                res.status(403).json('Token is not valid !')
            }else{
                req.user = user;
                next();
            } 
        })
        
        if(req.user){
            res.status(200).json('Access Verified')
        }
    }else{
        return res.status(401).json('You are not authentified !')
    }
}

const verifyTokenAndisAdmin = (req, res, next) => {
    verifyToken(req, res, () => {

        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json('You are not alowed to do That!')
        }
    })
}

const verifyTokenAndisAdminOrSameUser = (req, res, next) => {
    verifyToken(req, res, () => {

        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json('You are not alowed to do That!')
        }
    })
}

const verifyTokenAndAdminOrManager = (req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.isAdmin || req.user.isVendorDeliveryMan ){
            next();
        }else{
            return res.status(403).json('You are not alowed to do That!')
        }
    })
}

module.exports = { 
                   verifyToken, 
                   verifyTokenAndisAdmin,
                   verifyTokenAndAdminOrManager,
                   verifyTokenAndisAdminOrSameUser 
                };