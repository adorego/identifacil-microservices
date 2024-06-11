import { HttpException} from "@nestjs/common";

const HTTP_ERROR_CODE:number = 522;
export class ErrorObjetoeDuplicado extends HttpException{
   

    constructor(message:string){
      super(message, HTTP_ERROR_CODE);
      
    }

    
  }