import { Defensor } from "src/core/entities/defensor";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"defensor"})
export class DefensorModel extends Defensor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    tipo:"publico" | "privado";

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    apellido:string;


    @Column({type:"varchar"})
    telefono:string;

}