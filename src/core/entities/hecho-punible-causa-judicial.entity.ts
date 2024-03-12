import { CausaJudicial } from "./causa-judicial.entity";
import { Condena } from "./condena.entity";
import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { PplEnExpediente } from "./pplEnExpediente.entity";


export class HechoPunibleCausaJudicial{
    id:number;
    hecho_punible:HechoPunible;
    causa_judicial:CausaJudicial;
    expedientes:Array<ExpedienteJudicial>;
    pplEnExpediente:Array<PplEnExpediente>
}