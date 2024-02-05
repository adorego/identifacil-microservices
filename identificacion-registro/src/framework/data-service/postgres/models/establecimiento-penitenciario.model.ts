import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";

@Entity({name:"establecimiento_penitenciario"})
export class EstablecimientoPenitenciarioModel extends EstablecimientoPenitenciario{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  direccion:string;
}