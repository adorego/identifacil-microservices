import { GradoDeFalta } from "src/core/entities/grado-de-falta.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"grado_de_falta"})
export class GradoDeFaltaModel extends GradoDeFalta{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    nombre_de_la_falta:string;
    
    @Column({type:'varchar', nullable:false})
    grado_de_gravedad:string;

}