import { Departamento } from "./departamento.entity";
import { Pais } from "./pais.entity";

export class Ciudad{
  id:number;
  nombre:string;
  codigo:string;
  departamento:Departamento;
  pais:Pais;
}