import { CausaJudicialDTO } from "./causa.dto";


export class HechoPunibleDTO{
    nombre:string;
    codigo:string;
    causas:Array<CausaJudicialDTO>;
    
}