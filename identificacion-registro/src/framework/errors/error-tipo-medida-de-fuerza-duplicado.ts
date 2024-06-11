import { HttpException} from "@nestjs/common";

const HTTP_ERROR_CODE:number = 523;
export class TipoDeMedidaDeFuerzaDuplicado extends HttpException{
   

    constructor(message:string){
      super(message, HTTP_ERROR_CODE);
      
    }

    
  }