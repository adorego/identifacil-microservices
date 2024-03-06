import { CausaJudicial } from "./causa-judicial.entity";
import { HechoPunible_CausaJudicial } from "./hecho-punible-causa-judicial.entity";


export class HechoPunible{
  id:number;
  nombre:string;
  codigo:string;
  causas:Array<CausaJudicial>;
  hechosPuniblesCausas:Array<HechoPunible_CausaJudicial>;
  
}