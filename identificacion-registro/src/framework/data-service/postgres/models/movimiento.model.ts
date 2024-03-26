import { Movimiento } from "src/core/entities/movimiento.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { MotivoDeTrasladoModel } from "./motivo-traslado.model";
import { MedidaDeSeguridadModel } from "./medida-de-seguridad.model";
import { CustodioModel } from "./custodio.model";
import { ChoferModel } from "./chofer.model";
import { VehiculoModel } from "./vehiculo.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { PplModel } from "./ppl.model";
import { FuncionarioModel } from "./funcionario.model";

@Entity({name:"movimiento"})
export class MovimientoModel extends Movimiento{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",unique:true})
    numero_de_documento:string;

    @Column({type:"date"})
    fecha_de_documento:Date;

    @Column({type:"date"})
    fecha_de_traslado:Date;

    @ManyToOne(()=>FuncionarioModel,{eager:true})
    autorizado_por:FuncionarioModel;

    @ManyToOne(()=>MotivoDeTrasladoModel,{eager:true})
    motivo_de_traslado:MotivoDeTrasladoModel;

    @ManyToMany(()=>MedidaDeSeguridadModel,{eager:true})
    @JoinTable()
    medidas_de_seguridad:Array<MedidaDeSeguridadModel>;

    @Column({type:"varchar"})
    descripcion_motivo:string;

    @ManyToMany(()=>CustodioModel,{eager:true})
    @JoinTable()
    custodios:Array<CustodioModel>;

    @ManyToOne(()=>ChoferModel,{eager:true})
    chofer:ChoferModel;

    @ManyToOne(()=>VehiculoModel,{eager:true})
    vehiculo:VehiculoModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    origenTraslado:EstablecimientoPenitenciarioModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    destinoTraslado:EstablecimientoPenitenciarioModel;
    
    @Column({type:"varchar",nullable:true})
    documentoAdjunto:string;
    
    @ManyToMany(()=>PplModel,{eager:true})
    @JoinTable()
    ppls:Array<PplModel>
}