import { IngresoAPrision } from "./ingreso-a-prision.entity";

export class EstablecimientoPenitenciario{
  id:number;
  nombre:string;
  direccion:string;
  ingresos_a_prision:Array<IngresoAPrision>
}