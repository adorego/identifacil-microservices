export interface ErrorFormat{
  message:string;
  field?:string;
}
export abstract class CustomError extends Error{
  abstract statusCode:number;
  abstract serializeErrors():ErrorFormat[];
  constructor(message:string){
    super(message);
    Object.setPrototypeOf(this, CustomError);
  }
}