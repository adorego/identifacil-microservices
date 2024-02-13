import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { Seguridad } from "src/core/entities/seguridad.entity";

@Entity({name:'seguridad'})
export class SeguridadModel extends Seguridad{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, persona => persona.seguridad)
  persona:PersonaModel;

  @Column({type:"boolean", nullable:true})
  riesgoParaPersonal: boolean;

  @Column({type:"boolean", nullable:true})
  riesgoParaPersonal_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  riesgoParaPersonalRespuesta: string;

  @Column({type:"boolean", nullable:true})
  riesgoParaPersonalRespuesta_modificado:boolean;

  @Column({type:"boolean", nullable:true})
  riesgoParaReclusos: boolean;

  @Column({type:"boolean", nullable:true})
  riesgoParaReclusos_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  riesgoParaReclusosRespuesta: string;

  @Column({type:"boolean", nullable:true})
  riesgoParaReclusosRespuesta_modificado:boolean;

  @Column({type:"boolean", nullable:true})
  riesgoDeSufrirLesionPorOtrosReclusos: boolean;

  @Column({type:"boolean", nullable:true})
  riesgoDeSufrirLesionPorOtrosReclusos_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  riesgoDeSufrirLesionPorOtrosReclusosRespuesta: string;

  @Column({type:"boolean", nullable:true})
  riesgoDeDanharLaPropiedad: boolean;

  @Column({type:"boolean", nullable:true})
  riesgoDeDanharLaPropiedad_modificado:boolean;

  @Column({type:"varchar"})
  riesgoDeDanharLaPropiedadRespuesta: string;

  @Column({type:"boolean", nullable:true})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad: boolean;

  @Column({type:"boolean", nullable:true})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: string;

  @Column({type:"boolean", nullable:true})
  tieneEntrenamientoMilitarPrevio: boolean;

  @Column({type:"boolean", nullable:true})
  tieneEntrenamientoMilitarPrevio_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  tieneEntrenamientoMilitarPrevioRespuesta: string;

  @Column({type:"boolean", nullable:true})
  eraFuncionarioPublico: boolean;

  @Column({type:"boolean", nullable:true})
  eraFuncionarioPublico_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  eraFuncionarioPublicoRespuesta: string;
}
