import { MotivoDeMedidaDeFuerza } from "src/core/entities/motivo-de-medida-de-fuerza.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";


export class ResultadoMedidaDeFuerzaValidarDTO{
    ppl:Ppl;
    tipo_de_medida_de_fuerza:TipoDeMedidaDeFuerza;
    motivo_de_medida_de_fuerza:MotivoDeMedidaDeFuerza;
    
}