import { HttpException } from "@nestjs/common";

const CODIGO_DE_ERROR:number=524;
export class ErrorHechosPuniblesDuplicado extends HttpException{
    constructor(mensaje:string){
        super(mensaje,CODIGO_DE_ERROR);
    }
}