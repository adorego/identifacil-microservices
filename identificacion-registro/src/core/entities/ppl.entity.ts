import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { Persona } from "./persona.entity";

export class Ppl{
  id:number;

  persona:Persona;

  establecimiento_penitenciario:EstablecimientoPenitenciario;
}