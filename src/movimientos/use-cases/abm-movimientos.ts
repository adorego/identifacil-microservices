import { IMovimientosDataService } from "../core/abstract/movimientos-data.service";
import { Injectable } from "@nestjs/common";
import { TrasladoDTO } from "../core/dto/traslado-dto";

@Injectable()
export class AbmMovimientosUseCase{
  constructor(
    private dataService:IMovimientosDataService
  ){

  }

  async obtener_movimientos(){
    return await this.dataService.movimiento.getAll();
  }

  async obtener_traslados(){
    return await this.dataService.traslados.getAll();
  }

  async crear_traslado(datosDeTrasladoDTO:TrasladoDTO, documentoDeAutorizacion:Express.Multer.File){
      
  }
}