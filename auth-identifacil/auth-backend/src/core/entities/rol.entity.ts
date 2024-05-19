import { Permiso } from "./permiso.entity";

export class Rol{
    id:number;
    nombre:string;
    permisos:Array<Permiso>;
}