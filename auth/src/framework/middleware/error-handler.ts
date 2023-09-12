import {NextFunction, Request, Response} from "express";

import { CustomError } from "../../errors/custom-error";
import { DataBaseConnectionError } from "../../errors/database-connection-error";
import { RequestValidationError } from "../../errors/request-validation-error";

export const errorHandler = (error:Error, req:Request, res:Response, next:NextFunction) =>{
  // console.log("Ocurrio un error:", error);
  if(error instanceof CustomError){
    return res.status(error.statusCode).send(error.serializeErrors());
  }
  
  res.status(400).send(
    {
      erros:[
        {
          message:"Ocurrio un error"
        }
      ]
    }
  )
}