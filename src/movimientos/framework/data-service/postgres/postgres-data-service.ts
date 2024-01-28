import { Injectable, OnApplicationBootstrap } from "@nestjs/common";

import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { IMovimientosDataService } from "src/movimientos/core/abstract/movimientos-data.service";
import { PostgresMovimientosGenericRepository } from "./postgres-generic-repository";
import { Repository } from "typeorm";
import { MovimientoModel } from "./model/movimiento.model";
import { InjectRepository } from "@nestjs/typeorm";
import { TrasladoModel } from "./model/traslado.model";
import { AutoridadModel } from "./model/autoridad.model";
import { ChoferModel } from "./model/chofer.model";
import { CustodiaModel } from "./model/custodia.model";
import { MedidaDeSeguridadModel } from "./model/medida-seguridad.model";
import { MotivoTrasladoModel } from "./model/motivo-traslado.model";
import { VehiculoModel } from "./model/vehiculo.model";
import { Vehiculo } from "src/movimientos/core/entities/vehiculo.entity";
import { PostgreGenericRepository } from "src/framework/data-service/postgres/postgres-generic-repository";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { EstablecimientoPenitenciarioModel } from "src/framework/data-service/postgres/models/establecimiento-penitenciario.model";

@Injectable()
export class PostgresMovimientosDataService implements IMovimientosDataService, OnApplicationBootstrap{

  movimiento: PostgresMovimientosGenericRepository<MovimientoModel>;
  traslados: IGenericRepository<TrasladoModel>;
  autoridades: IGenericRepository<AutoridadModel>;
  chofer: IGenericRepository<ChoferModel>;
  custodia: IGenericRepository<CustodiaModel>;
  medidadDeSeguridad: IGenericRepository<MedidaDeSeguridadModel>;
  motivoDeTraslados: IGenericRepository<MotivoTrasladoModel>;
  vehiculo: IGenericRepository<VehiculoModel>;
  establecimiento: IGenericRepository<EstablecimientoPenitenciarioModel>;
  constructor(
    @InjectRepository(MovimientoModel)
    private movimientos_repository:Repository<MovimientoModel>,
    @InjectRepository(TrasladoModel)
    private traslados_repository:Repository<TrasladoModel>,
    @InjectRepository(AutoridadModel)
    private autoridades_repository:Repository<AutoridadModel>,
    @InjectRepository(ChoferModel)
    private chofer_repository:Repository<ChoferModel>,
    @InjectRepository(CustodiaModel)
    private custodia_repository:Repository<CustodiaModel>,
    @InjectRepository(MedidaDeSeguridadModel)
    private medidaDeSeguridad_repository:Repository<MedidaDeSeguridadModel>,
    @InjectRepository(MotivoTrasladoModel)
    private motivoDeTraslado_repository:Repository<MotivoTrasladoModel>,
    @InjectRepository(VehiculoModel)
    private vehiculo_repository:Repository<VehiculoModel>,
    @InjectRepository(EstablecimientoPenitenciarioModel)
    private establecimiento_repository:Repository<EstablecimientoPenitenciarioModel>

  ){}
  
  
  

  onApplicationBootstrap() {
    this.movimiento = new PostgresMovimientosGenericRepository<MovimientoModel>(this.movimientos_repository);
    this.traslados = new PostgresMovimientosGenericRepository<TrasladoModel>(this.traslados_repository);
    this.autoridades = new PostgresMovimientosGenericRepository<AutoridadModel>(this.autoridades_repository);
    this.chofer = new PostgresMovimientosGenericRepository<ChoferModel>(this.chofer_repository);
    this.custodia = new PostgresMovimientosGenericRepository<CustodiaModel>(this.custodia_repository);
    this.medidadDeSeguridad = new PostgresMovimientosGenericRepository<MedidaDeSeguridadModel>(this.medidaDeSeguridad_repository);
    this.motivoDeTraslados = new PostgresMovimientosGenericRepository<MotivoTrasladoModel>(this.motivoDeTraslado_repository);
    this.vehiculo = new PostgresMovimientosGenericRepository<VehiculoModel>(this.vehiculo_repository);
    this.establecimiento = new PostgresMovimientosGenericRepository<EstablecimientoPenitenciarioModel>(this.establecimiento_repository);
  }

}