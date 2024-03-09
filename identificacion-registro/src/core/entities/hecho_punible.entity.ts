import { CausaJudicial } from "./causa-judicial.entity";
import { HechoPunibleCausaJudicial } from "./hecho-punible-causa-judicial.entity";


export class HechoPunible{
  id:number;
  nombre:string;
  codigo:string;
  causas:Array<CausaJudicial>;
  hechosPuniblesCausas:Array<HechoPunibleCausaJudicial>;
  
}