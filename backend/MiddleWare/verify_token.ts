import { Request, Response, NextFunction } from "express";
import jwt_helper from "../helpers/jwt_helper";
import { ClientError } from "../Models/client-errors";


const verifyToken = async (request:Request, response:Response, next: NextFunction) => {
    console.log(request.body, request.headers)

    const authorizationHeader = request.header("authorization")
    const isValidToken = await jwt_helper.verifyTokenAsync(authorizationHeader);

    if(!isValidToken){
        next(new ClientError(401, "Invalid token"));
        return
    }

    next();

}

export default verifyToken;