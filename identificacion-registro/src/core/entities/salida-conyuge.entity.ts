import { Concubino } from "./concubino.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { IngresoConyuge } from "./ingreso-coyuge.entity";
import { Ppl } from "./ppl.entity";


export class SalidaConyuge{
    id:number;
    conyuge:Concubino;
    ppl_que_visito:Ppl;
    fecha_salida:string;
    hora_salida:string;
    entrada_asociada:IngresoConyuge;
    establecimiento:EstablecimientoPenitenciario;
    observacion:string;
}