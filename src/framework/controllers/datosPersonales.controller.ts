import { Body, Controller, Logger, Post } from "@nestjs/common";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro-datos-personales.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/respuesta-registro-datos-personales.dto";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { RegistroDatosPersonalesFactory } from "src/use-cases/registro-datosPersonales-factory.service";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller('datos_personales')
export class DatosPersonalesController{
  private readonly logger = new Logger('DatosPersonalesController');
  constructor(
    private registroPersonaUseCase:RegistroUseCase,
  ){

  }

  @Post()
  async create(@Body() registro_datosPersonales:RegistroDatosPersonalesDTO):Promise<RespuestaRegistroDatosPersonalesDTO>{
    this.logger.log('Identificacion:', registro_datosPersonales.numeroDeIdentificacion);
    this.registroPersonaUseCase.registrar_datosPersonales(registro_datosPersonales);
    return{
      sucess:true
    }
  }
}