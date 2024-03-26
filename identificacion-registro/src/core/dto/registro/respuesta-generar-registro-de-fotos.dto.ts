import { Ppl } from "src/core/entities/ppl.entity";
import { RegistroFoto } from "src/core/entities/registro_foto.entity";


export class RespuestaGenerarRegistroDeFotos{
    registro_de_fotos:Array<RegistroFoto>;
    ppl:Ppl;
}