import { Funcionario } from "./funcionario.entity";
import { MotivoDeMedidaDeFuerza } from "./motivo-de-medida-de-fuerza.entity";
import { Ppl } from "./ppl.entity";
import { RegistroMedico } from "./registro-medico.entity";
import { TipoDeMedidaDeFuerza } from "./tipo-medida-de-fuerza.entity";

export class MedidaDeFuerza{
    id:number;
    fecha_inicio:Date;
    fecha_fin:Date;
    ppl:Ppl;
    tipo_de_medida_de_fuerza:TipoDeMedidaDeFuerza;
    motivo:MotivoDeMedidaDeFuerza;
    registros_medicos:Array<RegistroMedico>
    exigencias:Array<string>;
    negociadores:Array<Funcionario>;
}