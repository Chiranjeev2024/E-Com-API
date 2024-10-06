import jwt from 'jsonwebtoken'

const jwtAuth = (req, res, next)=>{
    // 1. Read the token.

    const token = req.headers['authorization'];

    // 2. if no token, return the error.

    if (!token) {
        return res.status(401).send("Unauthorized Access");
    }

    // 3. check if token is valid.
    try{
        const payload = jwt.verify(token, "mHf2112UIyNCJAG0Icw7kNe4dRzPOt4l");
        req.userID = payload.userID;
    }
    // 4. else return error.
    catch(err){
        
        return res.status(401).send("Unauthorized Access");
    }

    // 5. call next middleware.

    next();
}

export default jwtAuth;