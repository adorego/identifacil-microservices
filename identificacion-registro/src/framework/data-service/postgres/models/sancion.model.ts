import { Sancion } from "src/core/entities/sancion.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeSancionModel } from "./tipo-sancion.model";
import { FaltaModel } from "./falta.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplModel } from "./ppl.model";

@Entity()
export class SancionModel extends Sancion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToOne(()=>TipoDeSancionModel)
    tipo:TipoDeSancionModel;

    @Column({type:"date"})
    fecha_inicio:Date;

    @Column({type:"date"})
    fecha_fin:Date;


    @ManyToOne(()=>FaltaModel)
    falta:FaltaModel;

    @ManyToOne(()=>PplModel)
    ppl:PplModel;
}