import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { Seguridad } from "src/core/entities/seguridad.entity";

@Entity({name:'seguridad'})
export class SeguridadModel extends Seguridad{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, persona => persona.seguridad)
  persona:PersonaModel;

  @Column({type:"boolean"})
  riesgoParaPersonal: boolean;

  @Column({type:"boolean"})
  riesgoParaPersonal_modificado:boolean;

  @Column({type:"varchar"})
  riesgoParaPersonalRespuesta: string;

  @Column({type:"boolean"})
  riesgoParaPersonalRespuesta_modificado:boolean;

  @Column({type:"boolean"})
  riesgoParaReclusos: boolean;

  @Column({type:"boolean"})
  riesgoParaReclusos_modificado:boolean;

  @Column({type:"varchar"})
  riesgoParaReclusosRespuesta: string;

  @Column({type:"boolean"})
  riesgoParaReclusosRespuesta_modificado:boolean;

  @Column({type:"boolean"})
  riesgoDeSufrirLesionPorOtrosReclusos: boolean;

  @Column({type:"boolean"})
  riesgoDeSufrirLesionPorOtrosReclusos_modificado:boolean;

  @Column({type:"varchar"})
  riesgoDeSufrirLesionPorOtrosReclusosRespuesta: string;

  @Column({type:"boolean"})
  riesgoDeDanharLaPropiedad: boolean;

  @Column({type:"boolean"})
  riesgoDeDanharLaPropiedad_modificado:boolean;

  @Column({type:"varchar"})
  riesgoDeDanharLaPropiedadRespuesta: string;

  @Column({type:"boolean"})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad: boolean;

  @Column({type:"boolean"})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado:boolean;

  @Column({type:"varchar"})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: string;

  @Column({type:"boolean"})
  tieneEntrenamientoMilitarPrevio: boolean;

  @Column({type:"boolean"})
  tieneEntrenamientoMilitarPrevio_modificado:boolean;

  @Column({type:"varchar"})
  tieneEntrenamientoMilitarPrevioRespuesta: string;

  @Column({type:"boolean"})
  eraFuncionarioPublico: boolean;

  @Column({type:"boolean"})
  eraFuncionarioPublico_modificado:boolean;

  @Column({type:"varchar"})
  eraFuncionarioPublicoRespuesta: string;
}
