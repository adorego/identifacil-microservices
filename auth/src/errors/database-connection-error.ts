import { CustomError } from "./custom-error";

export class DataBaseConnectionError extends CustomError{
  statusCode: number = 500;
  reason:string = "Hubo un error en la conexión con la Base de Datos"
  constructor(){
    super("Hubo un error con la conexión a la Base de Datos");

    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }

  serializeErrors(){
    return[
      {message:this.reason}
    ]
  }
}