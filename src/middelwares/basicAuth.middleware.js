import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next)=>{

    // 1. Check if authorization header is empty or not.

    const authHeader = req.headers["authorization"];

    // 2. Extract credentials.

    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }

    console.log(authHeader);

    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);

    // 3. Decode credentials.

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');

    // 4.

    const user = UserModel.getAll().find(u=>u.email==creds[0] && u.password == creds[1]);

    if(user){
        next();
    }
    else{
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;