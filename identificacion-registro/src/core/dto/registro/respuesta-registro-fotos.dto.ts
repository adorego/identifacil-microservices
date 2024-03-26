import { RegistroFoto } from "src/core/entities/registro_foto.entity";


export class RespuestaRegistroFotosDTO{
    success:boolean;
    registro_de_fotos:Array<RegistroFoto>;
    id:number;
}