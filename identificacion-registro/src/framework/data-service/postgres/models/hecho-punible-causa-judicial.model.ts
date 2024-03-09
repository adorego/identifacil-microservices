import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HechoPunibleModel } from "./hecho-punible.model";
import { CausaJudicialModel } from "./causa-judicial.model";
import { HechoPunibleCausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { CondenaModel } from "./condena.model";

@Entity({name:"hechopunible_causajudicial"})
export class HechoPunibleCausaJudicialModel extends HechoPunibleCausaJudicial{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>HechoPunibleModel, hechoPunible =>hechoPunible.hechosPuniblesCausas,{eager:true})
    hecho_punible:HechoPunibleModel;

    @ManyToOne(()=>CausaJudicialModel, causaJudicial=>causaJudicial.hechosPuniblesCausas, {eager:true})
    causa_judicial:CausaJudicialModel;

    @ManyToMany(()=>ExpedienteJudicialModel, expediente=>expediente.hechosPuniblesCausas)
    expedientes:Array<ExpedienteJudicialModel>;

    
}