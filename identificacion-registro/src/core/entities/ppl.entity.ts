import { Condena } from "./condena.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { Persona } from "./persona.entity";
import { RegistroFoto } from "./registro_foto.entity";
import { Falta } from "./falta.entity";
import { MedidaDeFuerza } from "./medida-de-fuerza.entity";

export class Ppl{
  id:number;
  persona:Persona;
  prontuario:string;
  expedientes:Array<ExpedienteJudicial>;
  establecimiento_penitenciario:EstablecimientoPenitenciario;
  condenas:Array<Condena>;
  registro_de_fotos:Array<RegistroFoto>;
  medidas_de_fuerza:Array<MedidaDeFuerza>;
  faltas:Array<Falta>
}