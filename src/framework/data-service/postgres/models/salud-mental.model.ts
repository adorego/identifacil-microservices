import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { SaludMental } from "src/core/entities/salud-mental.entity";

@Entity({name:'salud_mental'})
export class SaludMentalModel extends SaludMental{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:'boolean', nullable:true})
  sigue_tratamiento_salud_mental:boolean;

  @Column({type:'boolean', nullable:false})
  sigue_tratamiento_mental_modificado:boolean;
  
  @Column({type:'boolean', nullable:true})
  tiene_antecedentes_de_lesiones_autoinflingidas:boolean;

  @Column({type:'boolean', nullable:false})
  tiene_antecedentes_de_lesiones_autoinflingidas_modificado:boolean;



  @Column({type:'boolean', nullable:true})
  ha_estado_internado_en_hospital_psiquiatrico:boolean;
  
  @Column({type:'boolean', nullable:false})
  ha_estado_internado_en_hospital_psiquiatrico_modificado:boolean;

  
  @Column({type:'boolean', nullable:true})
  reporta_abuso_de_droga_previo_al_ingreso:boolean;

  @Column({type:'boolean', nullable:false})
  reporta_abuso_de_droga_previo_al_ingreso_modificado:boolean;
  
  @Column({type:'varchar', array:true})
  medicacion_actual:Array<string>;

  @Column({type:'boolean', array:false})
  medicacion_actual_modificada:boolean;

  @Column({type:'boolean', nullable:true})
  tiene_afeccion_severa_por_estupefacientes:boolean;

  @Column({type:'boolean', array:false})
  tiene_afeccion_severa_por_estupefaciente_modificado:boolean;

  
}