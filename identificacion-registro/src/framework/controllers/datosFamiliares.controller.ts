import { Body, Controller, HttpException, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RespuestaRegistrarDatosFamiliaresDTO } from "src/core/dto/registro_familiar/respuesta-registrar-datos-familiares.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller(
  'datos_familiares'
)
export class DatosFamiliaresController{
  private readonly logger = new Logger('DatosFamiliaresController');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){}

  @Post()
  async create(@Body() registroDatosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaRegistrarDatosFamiliaresDTO>{
    this.logger.log("Datos enviado:", registroDatosFamiliaresDTO, 'metodo:create');
    try{
      const respuestaRegistroDatosFamiliares = await this.registroPersonaUseCase.registrar_datos_familiares(registroDatosFamiliaresDTO);
      if(!respuestaRegistroDatosFamiliares.id){
        throw new HttpException("Error al registrar datos familiares",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return(
      {
        success:true,
        id:respuestaRegistroDatosFamiliares?.id
      }
    )

    }catch(error){
      this.logger.error('Error al realizar el registro de Datos Familiares');

    }
    
    
  }

  @Put(':id')
  async update(@Param() param, @Body() registroDatosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaRegistrarDatosFamiliaresDTO>{
    this.logger.log("Datos enviado:", registroDatosFamiliaresDTO, 'metodo:create');
    try{
        const respuestaRegistroDatosFamiliares = await this.registroPersonaUseCase.actualizar_datos_familiares(param.id,registroDatosFamiliaresDTO);
        return(
          {
            success:true,
            id:respuestaRegistroDatosFamiliares.id
          }
        )
        
    }catch(error){
      this.logger.error('Error al realizar el registro de Datos Familiares');
    }
  }

}