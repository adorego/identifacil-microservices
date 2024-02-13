import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { PersonaModel } from "./persona.model";

@Entity({name:'limitacion_idiomatica'})
export class LimitacionIdiomaticaModel extends LimitacionIdiomatica{
  
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  necesitaInterprete:boolean;

  @Column()
  necesitaInterprete_modificado:boolean;

  @Column()
  tieneDificultadParaLeerYEscribir:boolean;

  @Column()
  tieneDificultadParaLeerYEscribir_modificado:boolean;
}