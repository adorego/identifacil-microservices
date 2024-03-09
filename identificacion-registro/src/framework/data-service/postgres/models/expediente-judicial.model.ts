import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { CiudadModel } from "./ciudad.model";
import { DespachoJudicialModel } from "./despachos-judiciales.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { DefensorModel } from "./defensor.model";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";
import { HistorialCompurgamientoRecalculadaModel } from "./historial-compurgamiento-recalculada.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplModel } from "./ppl.model";
import { Condena } from "src/core/entities/condena.entity";
import { CondenaModel } from "./condena.model";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";

@Entity({name:'expediente_judicial'})
export class ExpedienteJudicialModel extends ExpedienteJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"int", nullable:false,unique:true})
  numeroDeExpediente:string;

  @Column({type:"boolean",nullable:false})
  condenado:boolean
  
  
  @OneToMany(() => PplEnExpedienteModel, pplEnExpediente=>pplEnExpediente.expediente,{eager:true, cascade:true})
  pplsEnExpediente:Array<PplEnExpedienteModel>;

  @Column({type:'varchar', nullable:false})
  caratula_expediente:string;

  @ManyToOne(()=>DespachoJudicialModel,{eager:true})
  despacho_judicial:DespachoJudicialModel;

  @ManyToOne(()=>CircunscripcionJudicialModel,{eager:true})
  circunscripcion: CircunscripcionJudicialModel;

  
  @ManyToOne(()=>CiudadModel,{eager:true})
  ciudad: CiudadModel;

   
  @ManyToMany(() => HechoPunibleCausaJudicialModel, hechosPuniblesCausas=>hechosPuniblesCausas.expedientes,{cascade:true, eager:true})
  @JoinTable()
  hechosPuniblesCausas: Array<HechoPunibleCausaJudicialModel>;



  @Column({type:"int", nullable:true})
  anho:number;

  
  @Column({type:"date",nullable:true})
  fecha_de_aprehension:Date;
  
  @Column({type:"varchar",nullable:true})
  juzgado_de_tribunal_de_sentencia:string;

  @Column({type:"varchar",nullable:true})
  secretaria:string;

  @Column({type:"varchar",nullable:true})
  lugar_del_hecho:string;

  @Column({type:"varchar",nullable:true})
  link_de_noticia:string;
 
  
}

