import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'vacuna'})
export class VacunaModel{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({type:'varchar'})
  nombre:string;
}