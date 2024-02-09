import { DatosFamiliares } from "./datos-familiares.entity";

export class Familiar{
  id:number;
  nombre:string;
  apellido:string;
  vinculo:string;
  lugar:string;
  datosFamiliares:DatosFamiliares;
}