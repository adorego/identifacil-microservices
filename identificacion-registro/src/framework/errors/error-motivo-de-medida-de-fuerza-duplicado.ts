import { HttpException} from "@nestjs/common";

const HTTP_ERROR_CODE:number = 524;
export class ErrorMotivoDeMedidaDeFuerzaDuplicado extends HttpException{
   

    constructor(message:string){
      super(message, HTTP_ERROR_CODE);
      
    }

    
  }