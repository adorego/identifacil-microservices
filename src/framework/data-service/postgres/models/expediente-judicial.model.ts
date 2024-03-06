import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { CiudadModel } from "./ciudad.model";
import { DespachoJudicialModel } from "./despachos-judiciales.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { DefensorModel } from "./defensor.model";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";
import { HistorialCompurgamientoRecalculadaModel } from "./historial-compurgamiento-recalculada.model";

@Entity({name:'expediente_judicial'})
export class ExpedienteJudicialModel extends ExpedienteJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"int", nullable:false,unique:true})
  numeroDeExpediente:number;

  @Column({type:Date, nullable:false})
  fechaDeExpediente: Date;

  @Column({type:"int", nullable:true})
  numeroDeDocumento:number;

  @Column({type:"int", nullable:true})
  anho:number;

  @Column({type:"boolean",nullable:false})
  condenado:boolean
  
  @Column({type:"varchar", nullable:true})
  estado_procesal:string;

  @Column("int",{array:true, nullable:true})
  ppls:Array<number>;

  @Column({type:'varchar', nullable:false})
  caratula_expediente:string;

  @ManyToOne(()=>DespachoJudicialModel,{eager:true})
  despacho_judicial:DespachoJudicialModel;

  @ManyToMany(() => HechoPunibleCausaJudicialModel, hechosPuniblesCausas=>hechosPuniblesCausas.expedientes,{cascade:true, eager:true})
  hechosPuniblesCausas: Array<HechoPunibleCausaJudicialModel>;

  @ManyToOne(()=>CircunscripcionJudicialModel,{eager:true})
  circunscripcion: CircunscripcionJudicialModel;

  @ManyToOne(()=>CiudadModel,{eager:true})
  ciudad: CiudadModel;

  @Column({type:"date",nullable:true})
  fecha_de_aprehension:Date;
  
  @Column({type:"int",nullable:true})
  tiempo_de_condena:number;

  @Column({type:"boolean",nullable:true})
  tiene_anhos_extra_de_seguridad:boolean;

  @Column({type:"int",nullable:true})
  tiempo_de_seguridad:number;

  @Column({type:"varchar",nullable:true})
  sentencia_definitiva:string;

  @Column({type:"date",nullable:true})
  fecha_de_compurgamiento_inicial:Date;

  @Column({type:"date",nullable:true})
  fecha_de_compurgamiento_recalculada:Date;

  @OneToMany(()=>HistorialCompurgamientoRecalculadaModel, historial=>historial.expediente)
  historial_de_compurgamiento_recalculada:Array<HistorialCompurgamientoRecalculadaModel>;

  @Column({type:"varchar",nullable:true})
  juzgado_de_tribunal_de_sentencia:string;

  @Column({type:"varchar",nullable:true})
  secretaria:string;

  @Column({type:"varchar",nullable:true})
  lugar_del_hecho:string;

  @Column({type:"varchar",nullable:true})
  link_de_noticia:string;

  @ManyToOne(()=>DefensorModel,{eager:true})
  defensor:DefensorModel;
  
}

