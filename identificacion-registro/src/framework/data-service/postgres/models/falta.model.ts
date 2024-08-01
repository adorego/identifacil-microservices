import { Falta } from "src/core/entities/falta.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeFaltaModel } from "./tipo-de-falta.model";
import { GradoDeFaltaModel } from "./grado-de-falta.model";
import { PplModel } from "./ppl.model";
import { SancionModel } from "./sancion.model";
import { TipoDeVictimaModel } from "./tipo-victima.model";

@Entity({name:"falta"})
export class FaltaModel extends Falta{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>TipoDeFaltaModel,{eager:true})
    tipo_de_falta:TipoDeFaltaModel;

    @Column({type:"varchar"})
    fecha_y_hora_de_la_falta:string;

    @Column({type:"varchar"})
    numero_de_resolucion:string;

    @Column({type:"date"})
    fecha_de_la_resolucion:Date;

    @Column({type:"varchar"})
    archivo_de_resolucion:string;

    @Column({type:"varchar"})
    descripcion_de_la_falta:string;

    @ManyToOne(()=>GradoDeFaltaModel,{eager:true})
    grado_de_falta:GradoDeFaltaModel;

    @ManyToMany(()=>TipoDeVictimaModel)
    @JoinTable()
    tipos_de_victimas:Array<TipoDeVictimaModel>;

    @Column({type:"varchar",array:true})
    victimas_de_la_falta:Array<string>

    @ManyToOne(()=>PplModel,{eager:true})
    ppl:PplModel;

    @OneToMany(()=>SancionModel,sancion=>sancion.falta,{eager:true})
    sanciones_aplicadas:Array<SancionModel>
}