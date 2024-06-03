import { Ppl } from "src/core/entities/ppl.entity";


export class InformeTraslado{
    cantidad_traslados:number;
    ppl_con_mas_traslados:{
        nombre:string;
        apellido:string;
        cantidad_de_traslados:number;
    };
    

}