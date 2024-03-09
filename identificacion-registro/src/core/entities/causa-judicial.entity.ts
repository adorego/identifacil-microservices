import { HechoPunibleCausaJudicial } from "./hecho-punible-causa-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";


export class CausaJudicial{
    id:number;
    nombre:string;
    codigo:string;
    hecho_punible:HechoPunible;
    hechosPuniblesCausas:Array<HechoPunibleCausaJudicial>;
}