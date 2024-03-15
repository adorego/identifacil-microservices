import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";
import { Pais } from "src/core/entities/pais.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaisModel } from "./pais.model";

@Entity({name:"contacto_de_embajada"})
export class ContactoDeEmbajadaModel extends ContactoEnEmbajada{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar"})
    nombre:string;
    @Column({type:"varchar"})
    numero:string;
    @ManyToOne(()=>PaisModel)
    pais: PaisModel;
}