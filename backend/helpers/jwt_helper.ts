import jwt from "jsonwebtoken";
import User from "../Models/user";

const secretKey = "108SunSunetions";

const getNewToken = (user:User): string => {
    const payload = {user}

    const token = jwt.sign(payload, secretKey, {expiresIn: "1h"});
    return token;
}

const verifyTokenAsync = (authorizationHeader):Promise<boolean> => {
    return new Promise<boolean>(resolve => {
        
        if(!authorizationHeader){
            resolve(false);
            return;
        }
                 //Correct header format: "Bearer the-token"
        const token = authorizationHeader.split(" ")[1];

        if(!token){
            resolve(false);
            return;
        }

        jwt.verify(token, secretKey, (err, payload) => {
            if(err){
                resolve(false);
                return;
            }
            resolve(true);      
        });
    });

}

const getUserFromToken = (authorizationHeader):User =>{

    const token = authorizationHeader.split(" ")[1];

    const payload = jwt.decode(token);

    const user = (payload as any).user;

    return user

}

export default {
    getNewToken,
    verifyTokenAsync,
    getUserFromToken
}