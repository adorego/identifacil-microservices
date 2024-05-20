import { Funcionario } from "./funcionario.entity";
import { Ppl } from "./ppl.entity";
import { TipoDeMedidaDeFuerza } from "./tipo-medida-de-fuerza.entity";

export class MedidaDeFuerza{
    id:number;
    fecha_inicio:Date;
    fecha_fin:Date;
    ppl_adheridos:Array<Ppl>;
    tipo_de_medida_de_fuerza:TipoDeMedidaDeFuerza;
    motivo:string;
    exigencias:Array<string>;
    negociadores:Array<Funcionario>;
}