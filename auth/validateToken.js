const jwt = require("jsonwebtoken");

//Created by using lecture materials
module.exports = function(req, res, next){

    const authHeader = req.headers["authorization"]
    console.log(authHeader);
    let token;
    //Check if token exists
    if(authHeader){
        token = authHeader.split(" ")[1];
    }else{
        token = null;
    }
    if(token == null) return res.sendStatus(401);   

    console.log("Token found")
    //use JWT to verify token by using env secret.
    jwt.verify(token, process.env.SECRET, (err, user)=> {
        if(err)return res.sendStatus(401);
        req.user = user;
        res.send({email: user.email});
    })
    next();
}