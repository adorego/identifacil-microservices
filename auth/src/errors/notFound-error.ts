import { CustomError, ErrorFormat } from "./custom-error";

export class NotFoundError extends CustomError{
  statusCode = 404;
  constructor(){
    super('No se encuentra esta ruta');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return[
      {message: 'No se encuentra la ruta'}
    ]
  }
  
}