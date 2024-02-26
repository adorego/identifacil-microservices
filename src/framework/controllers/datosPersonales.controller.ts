import { Body, Controller, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/registro/respuesta-registro-datos-personales.dto";
import { RespuestaActualizacionDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-actualizacion-datos-personales.dto";
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
    this.logger.log('Datos recibidos:', registro_datosPersonales);
    const respuestaRegistroDatosPersonales = await this.registroPersonaUseCase.registrar_datosPersonales(registro_datosPersonales);
    return{
      success:true,
      id:respuestaRegistroDatosPersonales.id
    }
  }

  @Put(':id')
  async update(@Param() param:any, @Body() datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<RespuestaActualizacionDatosPersonalesDTO>{
    this.logger.log('Datos recibidos:',`id:${param.id}` ,`datos personales:${datosPersonalesDTO}`);
    const resultadoActualizacionDatosPersonales = await this.registroPersonaUseCase.actualizar_datosPersonales(param.id, datosPersonalesDTO);
    return{
      id:resultadoActualizacionDatosPersonales.id,
      success:true
    }
  }
}