import { Defensor } from "./defensor";
import { IntervencionDefensor } from "./intervencion.entity";
import { Ppl } from "./ppl.entity";


export class EntrevistaDefensor{
    id:number;
    se_realizo_la_entrevista:boolean;
    fecha:Date;
    virtual:boolean;
    relato:string;
    defensor:Defensor;
    ppl:Ppl;
    intervencion:IntervencionDefensor;
}