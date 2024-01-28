import { Autoridad } from "../entities/autoridad.entity";
import { Chofer } from "../entities/chofer.entity";
import { Custodia } from "../entities/custodia.entity";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { MedidaDeSeguridad } from "../entities/medida-de-seguridad.entity";
import { MotivoTraslado } from "../entities/motivo-traslado.entity";
import { Movimiento } from "../entities/movimiento.entity";
import { Traslado } from "../entities/traslado.entity";
import { Vehiculo } from "../entities/vehiculo.entity";

export abstract class IMovimientosDataService{
  abstract movimiento:IGenericRepository<Movimiento>;
  abstract traslados:IGenericRepository<Traslado>;
  abstract autoridades:IGenericRepository<Autoridad>;
  abstract chofer:IGenericRepository<Chofer>;
  abstract custodia:IGenericRepository<Custodia>;
  abstract medidadDeSeguridad:IGenericRepository<MedidaDeSeguridad>;
  abstract motivoDeTraslados:IGenericRepository<MotivoTraslado>;
  abstract vehiculo:IGenericRepository<Vehiculo>;
  abstract establecimiento:IGenericRepository<EstablecimientoPenitenciario>;
  
}