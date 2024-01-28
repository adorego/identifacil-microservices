import { EstadoDeMovimiento } from "./estado-movimiento.entity";

export class Movimiento{
  id:number;
  salidaFecha:Date;
  salidaHora:Date;
  entradaFecha:Date;
  entradaHora:Date;
  estado:EstadoDeMovimiento;

}