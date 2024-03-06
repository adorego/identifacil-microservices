import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HechoPunibleModel } from "./hecho-punible.model";
import { CausaJudicialModel } from "./causa-judicial.model";
import { HechoPunible_CausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";

@Entity({name:"hechopunible_causajudicial"})
export class HechoPunibleCausaJudicialModel extends HechoPunible_CausaJudicial{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>HechoPunibleModel, hechoPunible =>hechoPunible.hechosPuniblesCausas,{eager:true})
    hecho_punible:HechoPunibleModel;

    @ManyToOne(()=>CausaJudicialModel, causaJudicial=>causaJudicial.hechosPuniblesCausas, {eager:true})
    causa_judicial:CausaJudicialModel;

    @ManyToMany(()=>ExpedienteJudicialModel, expediente=>expediente.hechosPuniblesCausas)
    @JoinTable()
    expedientes:Array<ExpedienteJudicial>;
}