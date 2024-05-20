import { Ppl } from "src/core/entities/ppl.entity";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";


export class ResultadoMedidaDeFuerzaValidarDTO{
    ppls:Array<Ppl>;
    tipo_de_medida_de_fuerza:TipoDeMedidaDeFuerza;
    
}