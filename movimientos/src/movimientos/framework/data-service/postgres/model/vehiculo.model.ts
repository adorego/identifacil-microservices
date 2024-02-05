import { Column, PrimaryGeneratedColumn } from "typeorm";

import { Vehiculo } from "src/movimientos/core/entities/vehiculo.entity";

export class VehiculoModel extends Vehiculo{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  chapa:string;
  @Column({type:"varchar"})
  marca:string;
  @Column({type:"varchar"})
  descripcioin:string;
}