import { EntrevistaDefensor } from "src/core/entities/entrevista-defensor.entity";
import { DefensorModel } from "./defensor.model";
import { PplModel } from "./ppl.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervencionDefensorModel } from "./intervencion-defensor.model";

@Entity({name:'entrevista_defensor'})
export class EntrevistaDefensorModel extends EntrevistaDefensor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"boolean"})
    se_realizo_la_entrevista:boolean;

    @Column({type:"date"})
    fecha:Date;

    @Column({type:"boolean"})
    virtual:boolean;

    @Column({type:"varchar"})
    relato:string;

    @ManyToOne(()=>DefensorModel)
    defensor:DefensorModel;

    @ManyToOne(()=>PplModel)
    ppl:PplModel;

    @ManyToOne(()=>IntervencionDefensorModel)
    intervencion:IntervencionDefensorModel

}