import { DatosFamiliares } from "./datos-familiares.entity";

export class Hijo{
  id:number;
  nombre:string;
  edad:number;
  lugar_sistema_penitenciario:string;
  datosFamiliares:DatosFamiliares;
}