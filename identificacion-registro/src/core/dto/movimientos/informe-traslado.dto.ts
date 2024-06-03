import { Ppl } from "src/core/entities/ppl.entity";

export type ppl_con_traslado = {nombre:string,apellido:string,cantidad_de_traslado:number}
export class InformeTrasladoDTO{
    cantidad_traslados:number;
    ppl_con_mas_traslados:Array<ppl_con_traslado>


}