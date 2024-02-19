import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { CiudadModel } from "./ciudad.model";
import { CondenaModel } from "./condena.model";
import { DespachoJudicialModel } from "./despachos-judiciales.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { DefensorModel } from "./defensor.model";

@Entity({name:'causa_judicial'})
export class CausaJudicialModel extends CausaJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"int", nullable:true})
  numeroDeExpediente:number;

  @Column({type:"int", nullable:true})
  numeroDeDocumento:number;

  @Column({type:"int", nullable:false})
  anho:number;

  @Column({type:"varchar",nullable:true})
  condenado:boolean
  
  @Column({type:"varchar", nullable:true})
  estado_procesal:string;

  @Column({type:"int",nullable:true})
  ppls:Array<number>;

  @Column({type:'varchar', nullable:false})
  caratula_causa:string;

  @ManyToOne(()=>DespachoJudicialModel,{eager:true})
  despacho_judicial:DespachoJudicialModel;

  @ManyToMany(() => HechoPunibleModel)
  @JoinTable()
  hechos_punibles: Array<HechoPunibleModel>;

  @OneToOne(() => CondenaModel)
  @JoinColumn()
  condena: CondenaModel;

  @ManyToOne(()=>CircunscripcionJudicialModel)
  circunscripcion: CircunscripcionJudicialModel;

  @ManyToOne(()=>CiudadModel)
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

  @Column({type:"varchar",nullable:true})
  juzgado_de_tribunal_de_sentencia:string;

  @Column({type:"varchar",nullable:true})
  secretaria:string;

  @Column({type:"varchar",nullable:true})
  lugar_del_hecho:string;

  @Column({type:"varchar",nullable:true})
  link_de_noticia:string;

  @ManyToOne(()=>DefensorModel)
  defensor:DefensorModel;
  
}

