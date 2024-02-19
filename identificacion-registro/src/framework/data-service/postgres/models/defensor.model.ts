import { Defensor } from "src/core/entities/defensor";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"defensor"})
export class DefensorModel extends Defensor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombres:string;

    @Column({type:"varchar"})
    telefono:string;

}