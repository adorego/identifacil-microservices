

import { Rol } from "./rol.entity";

export class Usuario{
  id:number;
  ci:string;
  nombre:string;
  apellido:string;
  hash:string;
  salt:string;

  roles:Array<Rol>
  
}