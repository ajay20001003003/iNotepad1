var jwt = require('jsonwebtoken');
const jwt_secret = "kritikadolly"

const fetchuser = (req, res, next) => {


    // get tthe user from the jwt token and add id to req object

    const token = req.header('auth-token')


    if (!token) {
        res.status(401).send({ error: "please authentication using a valid token" });
    }



    try {
        const data = jwt.verify(token, jwt_secret);// here we verify the token 
        req.user = data.user;
        next();// and we call the next function

    } catch (error) {
        res.status(401).send({ error: "please authentication using a valid token" });

    }




}


module.exports = fetchuser;