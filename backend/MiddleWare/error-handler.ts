import { NextFunction, Request, Response } from "express"
import logger from "../helpers/log_helper";
import { ClientError } from "../Models/client-errors";



const errorHander = (err: any, request:Request, response:Response, next:NextFunction):void =>{

    

    if(err instanceof Error) {
        logger.error(err.message);
        const msgToReturn = global.config.isDevelopment ? err.message : "Some error occurred, please try again";
        response.status((err as any).status || 500).send(err.message);
        return;
    }

    if(err instanceof ClientError) {
        // logger.warn(err.message);
        response.status(err.status).send(err.message);
        return;
    }

    next();

}