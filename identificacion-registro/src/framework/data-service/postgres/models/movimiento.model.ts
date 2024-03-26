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

    @ManyToOne(()=>FuncionarioModel)
    autorizado_por:FuncionarioModel;

    @ManyToOne(()=>MotivoDeTrasladoModel)
    motivo_de_traslado:MotivoDeTrasladoModel;

    @ManyToMany(()=>MedidaDeSeguridadModel)
    @JoinTable()
    medidas_de_seguridad:Array<MedidaDeSeguridadModel>;

    @Column({type:"varchar"})
    descripcion_motivo:string;

    @ManyToMany(()=>CustodioModel)
    @JoinTable()
    custodios:Array<CustodioModel>;

    @ManyToOne(()=>ChoferModel)
    chofer:ChoferModel;

    @ManyToOne(()=>VehiculoModel)
    vehiculo:VehiculoModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    origenTraslado:EstablecimientoPenitenciarioModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    destinoTraslado:EstablecimientoPenitenciarioModel;
    
    @Column({type:"varchar",nullable:true})
    documentoAdjunto:string;
    
    @ManyToMany(()=>PplModel)
    @JoinTable()
    ppls:Array<PplModel>
}