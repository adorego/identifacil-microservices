import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";


@Entity({name:"causa_judicial"})
export class CausaJudicialModel extends CausaJudicial{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", nullable:false, unique:true})
    codigo:string;

    @Column({type:"varchar", nullable:false})
    nombre:string;

    @ManyToOne(()=>HechoPunibleModel, hechoPunible=>hechoPunible.causas)
    hecho_punible:HechoPunibleModel;

    @OneToMany(()=>HechoPunibleCausaJudicialModel,hechosPuniblesCausas=>hechosPuniblesCausas.causa_judicial)
    hechosPuniblesCausas:Array<HechoPunibleCausaJudicialModel>;
}