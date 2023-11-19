import { Body, Controller, Get, Post } from "@nestjs/common";
import { CedulaDTO } from "src/core/dtos/CedulaDTO";
import { ConsultaPoliciaRespuestaDTO } from "src/core/dtos/ConsultaPoliciaRespuestaDTO";
import { DatosPoliciaDTO } from "src/core/dtos/DatosPoliciaDTO";
import { ConsultaCIService } from "src/core/use-cases/consultaci/consultaci.use-case";


@Controller('api/consultaci')
export class ConsultaCIController{
  constructor(private policiaService:ConsultaCIService){}

  @Get('saludar')
  saludar(){
    console.log('Entro en saludar');
    return "Hola";
  }
  @Post()
  async getDatosCi(@Body() cedula:CedulaDTO):Promise<ConsultaPoliciaRespuestaDTO>{
    // console.log('ConsultaCI Controller, cedula:', cedula);
    const respuesta = new ConsultaPoliciaRespuestaDTO();
    
    try{
      const datos = await this.policiaService.consultarCI(cedula.cedula);
      respuesta.exito = true;
      respuesta.datosDeCedula = datos;
    }catch(error){
      respuesta.exito = false;
    }
    return respuesta;
  
  }
}