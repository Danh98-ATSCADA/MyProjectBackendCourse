const jwt = require("jsonwebtoken")
// const { ne } = require("sequelize/types/lib/operators")
const { secretKey} = require("../../config/config")
const authenticate = (req,res,next) => {
    const token = req.header("token")
    
    
    try {
        
        const decode = jwt.verify(token,secretKey)
        req.user = decode
        next()        
    } catch (error) {
        res.status(401).send({
            message: "Token khon hop le"
        })
    }
}

const authorize = (req,res,next) => {
    const {user} = req;
    if(user.role ==="ADMIN"){
        next()
    }
    else{
        res.status(403).send({
            message:"Ban da dang nhap nhung ko du quyen"
        })
    }
}

module.exports = {authenticate, authorize}