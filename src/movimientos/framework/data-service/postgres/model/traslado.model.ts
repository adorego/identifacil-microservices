import { Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { AutoridadModel } from "./autoridad.model";
import { ChoferModel } from "./chofer.model";
import { CustodiaModel } from "./custodia.model";
import { DocumentoDeAutorizacionModel } from "./documento-autorizacion.model";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { MedidaDeSeguridadModel } from "./medida-seguridad.model";
import { MotivoTrasladoModel } from "./motivo-traslado.model";
import { PersonaModel } from "src/framework/data-service/postgres/models/persona.model";
import { Traslado } from "src/movimientos/core/entities/traslado.entity";
import { VehiculoModel } from "./vehiculo.model";

export class TrasladoModel extends Traslado{

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => EstablecimientoPenitenciario)
  origen:EstablecimientoPenitenciario;

  @ManyToOne(() => EstablecimientoPenitenciario)
  destino:EstablecimientoPenitenciario;

  @Column({type:"date"})
  fecha:Date;

  @OneToOne(() =>DocumentoDeAutorizacionModel)
  @JoinColumn()
  documentoDeAutorizacion:DocumentoDeAutorizacionModel;

  @ManyToOne(() => AutoridadModel)
  autorizadoPor:AutoridadModel;

  @ManyToOne(() => MotivoTrasladoModel)
  motivo:MotivoTrasladoModel;

  @ManyToOne(() => MedidaDeSeguridadModel)
  medidaDeSeguridad:MedidaDeSeguridadModel;

  @Column({type:"varchar"})
  descripcionDeMotivoDeTraslado:string;

  @ManyToOne(() => CustodiaModel)
  custodia:CustodiaModel;

  @ManyToOne(() => ChoferModel)
  chofer:ChoferModel;

  @ManyToOne(() => VehiculoModel)
  vehiculo:VehiculoModel;

  @ManyToMany(() => PersonaModel)
  @JoinTable()
  ppls:Array<PersonaModel>;
}