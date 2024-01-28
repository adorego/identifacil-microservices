import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { FileService } from "src/framework/lib/files.service";
import { IMovimientosDataService } from "../core/abstract/movimientos-data.service";
import { TrasladoDTO } from "../core/dto/traslado-dto";

@Injectable()
export class AbmMovimientosFactory{
  constructor(
    private movimientosDataService:IMovimientosDataService,
    private fileService:FileService,
  ){}

  async verificar_guardar_documentoDeAutorizacion(documentoDeAutorizacion:Express.Multer.File, numeroDeIdentificacion:string):Promise<string | null>{
    try{
      if(documentoDeAutorizacion.mimetype !== "pdf"){

      }
      const fecha = new Date();
      const nombre = this.fileService.almacenar_archivo(documentoDeAutorizacion,`traslado_autorizacion_${numeroDeIdentificacion}_${fecha.toISOString()}`)
      return nombre;
    }catch(error){
      throw new HttpException("Error al guardar el documento de autorización", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return null;

  }

  async verificar_establecimiento(id:number):Promise<EstablecimientoPenitenciario | null>{
    try{
      const Establecimiiento:EstablecimientoPenitenciario = await this.movimientosDataService.establecimiento.get(id);
      return Establecimiiento;
    }catch(error){
      throw new HttpException("No existe el estblecimiento", HttpStatus.BAD_REQUEST);
    }
    return null;
  }
}