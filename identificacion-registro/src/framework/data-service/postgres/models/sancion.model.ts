import { Sancion } from "src/core/entities/sancion.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SancionModel extends Sancion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;
}