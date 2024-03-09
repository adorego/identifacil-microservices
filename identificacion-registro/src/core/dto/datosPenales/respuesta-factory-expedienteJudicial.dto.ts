import { HechoPunibleCausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { ExpedienteJudicial } from "../../entities/expediente-judicial.entity";
import { Defensor } from "src/core/entities/defensor";
import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";
import { Ciudad } from "src/core/entities/ciudad.entity";
import { DespachoJudicial } from "src/core/entities/despacho-judicial.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";


export class RespuestaFactoryExpedienteJudicialDTO{
    expedienteJudicial:ExpedienteJudicial;
    hechosPuniblesCausasJudiciales:Array<HechoPunibleCausaJudicial>;
    pplsEnExpediente:Array<PplEnExpediente>;
    circunscripcion:CircunscripcionJudicial;
    ciudad:Ciudad;
    despachoJudicial:DespachoJudicial;
    
}