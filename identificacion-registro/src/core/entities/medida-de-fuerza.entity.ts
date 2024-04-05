import { Funcionario } from "./funcionario.entity";
import { Ppl } from "./ppl.entity";

export class MedidaDeFuerza{
    id:number;
    fecha_inicio:Date;
    fecha_fin:Date;
    ppl_adheridos:Array<Ppl>;
    motivo:string;
    exigencias:Array<string>;
    negociadores:Array<Funcionario>;
}