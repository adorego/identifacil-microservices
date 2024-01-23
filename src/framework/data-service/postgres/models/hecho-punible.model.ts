import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { HechoPunible } from "src/core/entities/hecho_punible.entity";

@Entity({name:'hecho_punible'})
export class HechoPunibleModel extends HechoPunible{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;
}