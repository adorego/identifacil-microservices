import { CustomError, ErrorFormat } from "./custom-error";

import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError{
  statusCode: number = 400;
  serializeErrors(): ErrorFormat[] {
    const formatedErrors = this.errors.map(
      (error) =>{
        if(error.type === 'field'){
          return {message: error.msg, field:error.path}
        }else{
          return {message:error.msg}
        }
      }
    );
    return formatedErrors;
  }
  constructor(private errors:ValidationError[]){
    super("Ocurrió un error al validar los parámetros enviados");
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}