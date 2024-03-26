import { Ppl } from "src/core/entities/ppl.entity";
import { RegistroFoto } from "src/core/entities/registro_foto.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";


@Entity({name:"registro_foto"})
export class RegistroFotoModel extends RegistroFoto{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    foto:string;

    @ManyToOne(()=>PplModel,ppl=>ppl.registro_de_fotos)
    ppl:PplModel
}