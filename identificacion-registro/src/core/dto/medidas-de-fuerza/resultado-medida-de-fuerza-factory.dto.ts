import { MedidaDeFuerza } from "src/core/entities/medida-de-fuerza.entity";
import { MotivoDeMedidaDeFuerza } from "src/core/entities/motivo-de-medida-de-fuerza.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";


export class ResultadoMedidaDeFuerzaFactoryDTO{
    ppl:Ppl;
    tipo_de_medida_de_fuerza:TipoDeMedidaDeFuerza;
    medida_de_fuerza:MedidaDeFuerza;
    motivo_de_medida_de_fuerza:MotivoDeMedidaDeFuerza;
    

}