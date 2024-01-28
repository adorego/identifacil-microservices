import { Column, PrimaryGeneratedColumn } from "typeorm";

import { MotivoTraslado } from "src/movimientos/core/entities/motivo-traslado.entity";

export class MotivoTrasladoModel extends MotivoTraslado{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;
}