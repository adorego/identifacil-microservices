import { Column, PrimaryGeneratedColumn } from "typeorm";

import { Custodia } from "src/movimientos/core/entities/custodia.entity";

export class CustodiaModel extends Custodia{
  
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  apellido:string;

  @Column({type:"varchar"})
  numeroDeIdentidad:string;

  @Column({type:"boolean"})
  activo:boolean;
}