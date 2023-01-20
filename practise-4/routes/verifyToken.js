const jwt = require('jsonwebtoken');
const JWT_SECRET = "mysecret";

const verifyUserJWT = (req,res,next)=>{
    const jtoken = req.headers.token;

    if(jtoken){
        const cleanTk = jtoken.split(" ")[1];

        jwt.verify(cleanTk, JWT_SECRET, (err, user)=>{
            if(err) res.status(403).json("Token is not valid");
            console.log('jwt user' + JSON.stringify(user));
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("User not authenticated");
    }
}

module.exports = {verifyUserJWT};