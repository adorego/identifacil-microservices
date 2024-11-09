import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";
import { Defensor } from "./defensor";
import { EntrevistaDefensor } from "./entrevista-defensor.entity";
import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { Ppl } from "./ppl.entity";


export class IntervencionDefensor{
    id:number;
    defensor:Defensor;
    ppl:Ppl;
    expediente:ExpedienteJudicial;
    fecha_inicio_intervencion:Date;
    fecha_fin_intervencion:Date;
    activo:boolean;
    oficio_judicial_alta_intervencion:string;
    oficio_judicial_baja_intervencion:string | null;
    circunscripcion:CircunscripcionJudicial;
    entrevistas:Array<EntrevistaDefensor>;
}