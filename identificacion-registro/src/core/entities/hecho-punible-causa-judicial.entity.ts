import { CausaJudicial } from "./causa-judicial.entity";
import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";


export class HechoPunible_CausaJudicial{
    id:number;
    hecho_punible:HechoPunible;
    causa_judicial:CausaJudicial;
    expedientes:Array<ExpedienteJudicial>;
}