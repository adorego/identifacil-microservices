import { HttpException} from "@nestjs/common";

const HTTP_ERROR_CODE:number = 522;
export class ErrorExpedienteDuplicado extends HttpException{
   

    constructor(message:string){
      super(message, HTTP_ERROR_CODE);
      
    }

    
  }