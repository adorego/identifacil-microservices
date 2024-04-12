import { PuebloIndigena } from "src/core/entities/pueblo-indigena.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"pueblo_indigena"})
export class PuebloIndigenaModel extends PuebloIndigena{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    codigo:string;

    @Column({type:"varchar"})
    nombre:string;
}