import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { CiudadModel } from "./ciudad.model";
import { DespachoJudicialModel } from "./despachos-judiciales.model";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";

@Entity({name:'expediente_judicial'})
export class ExpedienteJudicialModel extends ExpedienteJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar", nullable:false,unique:true})
  numeroDeExpediente:string;

  @Column({type:"boolean",default:false})
  condenado:boolean
  
  @Column({type:'varchar', nullable:true})
  estado_procesal:string;

  @Column({type:"date",nullable:true})
  fecha_del_hecho: Date;
  
  @OneToMany(() => PplEnExpedienteModel, pplEnExpediente=>pplEnExpediente.expediente,{eager:true})
  ppls_en_expediente:Array<PplEnExpedienteModel>;

  @Column({type:'varchar', nullable:true})
  caratula_expediente:string;

  @ManyToOne(()=>DespachoJudicialModel,{eager:true})
  despacho_judicial:DespachoJudicialModel;

  @ManyToOne(()=>CircunscripcionJudicialModel,{eager:true})
  circunscripcion: CircunscripcionJudicialModel;

  
  @ManyToOne(()=>CiudadModel,{eager:true})
  ciudad: CiudadModel;

   
  @ManyToMany(() => HechoPunibleCausaJudicialModel, hechosPuniblesCausas=>hechosPuniblesCausas.expedientes,{eager:true})
  @JoinTable()
  hechosPuniblesCausas: Array<HechoPunibleCausaJudicialModel>;

  @OneToMany(()=>IngresoAPrisionModel,ingreso_a_prision=>ingreso_a_prision.expedienteJudicial)
  ingresos_a_prision:Array<IngresoAPrisionModel>

  @Column({type:"int", nullable:true})
  anho:number;

  
  
  @Column({type:"varchar",nullable:true})
  juzgado_de_tribunal_de_sentencia:string;

  @Column({type:"varchar",nullable:true})
  secretaria:string;

  @Column({type:"varchar",nullable:true})
  lugar_del_hecho:string;

  @Column({type:"varchar",nullable:true})
  link_de_noticia:string;
 
  @Column({type:"varchar",nullable:true})
  sentencia_definitiva:string;

  @Column({type:"date",nullable:true})
  fecha_sentencia_definitiva:Date;
  
}

