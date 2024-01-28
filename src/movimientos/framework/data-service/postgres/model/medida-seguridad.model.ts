import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { MedidaDeSeguridad } from "src/movimientos/core/entities/medida-de-seguridad.entity";

@Entity({name:"medida_seguridad"})
export class MedidaDeSeguridadModel extends MedidaDeSeguridad{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;
}