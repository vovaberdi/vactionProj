import { NextFunction, Request, Response } from "express";
import logger from "../helpers/log_helper";



const logRequests = (request: Request, response:Response, next:NextFunction) => {
    
    const msg = `${request.method} Request to ${request.originalUrl}`;

    logger.info(msg);
    next();
}

export default logRequests;