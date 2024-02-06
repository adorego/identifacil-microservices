import { OneToMany, OneToOne } from "typeorm";

import { GrupoSanguineo } from "./grupo-sanguineo.entity";
import { Persona } from "./persona.entity";
import { Vacuna } from "./vacuna.entity";

export class Salud{
  id:number;
  persona:Persona;
  tieneAfeccionADrogras:boolean;
  tieneAfeccionADrogas_modificado:boolean;
  grupo_sanguineo:GrupoSanguineo;
  grupo_sanguineo_modificado:boolean;
  vacunas_recibidas:Array<Vacuna>;
  vacunas_recibidas_modificada:boolean;
  presion_arterial:number;
  presion_arterial_modificada:boolean;
  frecuencia_cardiaca:number;
  frecuencia_cardiaca_modificada:boolean;
  frecuencia_respiratoria:number;
  frecuencia_respiratoria_modificada:boolean;
  temperatura:number;
  temperatura_modificada:boolean;
  peso:number;
  peso_modificado:boolean;
  talla:number;
  talla_modificado:boolean;
  imc:number;
  imc_modificado:boolean;
  vdrl:boolean;
  vdrl_modificado:boolean;
  vih:boolean;
  vih_modificado:boolean;
  tb:boolean;
  tb_modificado:boolean;
  gestacion:boolean;
  gestacion_modificado:boolean;
  tiempo_gestacion:number;
  tiempo_gestacion_modificado:boolean;
  fecha_parto:Date;
  fecha_parto_modificada:boolean;
  
  
}