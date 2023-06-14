//crypt 
const bcrypt = require('bcryptjs');
// JSONToken
const jwt = require('jsonwebtoken');
//config
const config = require('config');

let jsonWebTokenVerify = function(req, res, next){
    //console.log(req.headers);
    const bearerHeader = req.headers.authorization;    
    if(typeof bearerHeader!=='undefined') {
        const bearer = bearerHeader.split(' ');    
        var token = bearer[1];
        //console.log(token);
        if(token === 'null'){
            return res.status(401).send('Unauthorized Request');
        }
        else {
            try {
                let payload = jwt.verify(token, 
                    config.get('constants.jsonwebtoken.screat'),
                    {
                        algorithm: config.get('constants.jsonwebtoken.algorithm'),
                        expiresIn: config.get('constants.jsonwebtoken.expiresIn'),
                        audience: config.get('constants.jsonwebtoken.audience'),
                        issuer: config.get('constants.jsonwebtoken.issuer'),
                        subject: config.get('constants.jsonwebtoken.subject'),
                    }
                );                
                req.userId =  payload?.userId;   // Set the User Id on the request             
            }  
            catch(e){
                //console.log(e);
                if(e.name == 'JsonWebTokenError') {
                    return res.status(401).send('Unauthorized Request'); 
                }  
            }
            next();
        }
    } 
    else {
        return res.status(401).send('Unauthorized Request');
    }
}

module.exports = {
    verifyToken: jsonWebTokenVerify
}
