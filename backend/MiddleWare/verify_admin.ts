import { Request, Response, NextFunction } from "express";
import jwt_helper from "../helpers/jwt_helper";
import { ClientError } from "../Models/client-errors";
import Role from "../Models/Role";


const verifyAdmin = (request:Request, response:Response, next: NextFunction):void => {

    const authorizationHeader = request.header("authorization");
    
    const user = jwt_helper.getUserFromToken(authorizationHeader);
    
    if(user[0].role !== Role.Admin) {
        next(new Error("you must be an admin"));
        return;
    }
    next();
}

export default verifyAdmin;