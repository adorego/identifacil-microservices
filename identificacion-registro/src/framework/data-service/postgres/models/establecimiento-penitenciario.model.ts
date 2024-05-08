import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";

@Entity({name:"establecimiento_penitenciario"})
export class EstablecimientoPenitenciarioModel extends EstablecimientoPenitenciario{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  direccion:string;

  @OneToMany(()=>IngresoAPrisionModel, ingresosAPrision =>ingresosAPrision.establecimiento_penitenciario)
  ingresos_a_prision:Array<IngresoAPrisionModel>;

  @Column({type:"int"})
  capacidad: number;
}