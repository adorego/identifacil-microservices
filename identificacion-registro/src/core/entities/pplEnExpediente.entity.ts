import { Condena } from "./condena.entity";
import { Defensor } from "./defensor";
import { HechoPunibleCausaJudicial } from "./hecho-punible-causa-judicial.entity";
import { Ppl } from "./ppl.entity";


export class PplEnExpediente{
    id:number;
    ppl:Ppl;
    condena:Condena;
    defensor:Defensor;
    hechosPuniblesCausas:Array<HechoPunibleCausaJudicial>;
}