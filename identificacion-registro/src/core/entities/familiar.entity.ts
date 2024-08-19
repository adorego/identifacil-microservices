import { DatosFamiliares } from "./datos-familiares.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { VinculoFamiliar } from "./vinculo-familiar.entity";

export class Familiar{
  id:number;
  nombre:string;
  apellido:string;
  cedulaDeIdentidad:string;
  vinculo:VinculoFamiliar;
  establecimiento:EstablecimientoPenitenciario;
  datosFamiliares:DatosFamiliares;
  esFuncionario:boolean;
  edad:number;
}