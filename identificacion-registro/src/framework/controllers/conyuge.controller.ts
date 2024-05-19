import { Body, Controller, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ConyugeDTO } from "src/core/dto/conyuge/conyuge.dto";
import { ConyugeUseCases } from "src/use-cases/conyuge/conyuge-use-case.service";

@Controller(
    'conyuge'
)
export class ConyugeController{
  private readonly logger = new Logger('ConyugeController');
  constructor(
    private conyugeUseCases:ConyugeUseCases
  ){}

  @Get('saludar')
  async saludar(){
    return 'hola';
  }

   @Post()
   async crearConyuge(@Body() conyugeDTO:ConyugeDTO){
     const resultado = await this.conyugeUseCases.crearConyuge(conyugeDTO);
     return resultado;
   }

   @Put()
   async actualizarConyuge(@Body() conyugeDTO:ConyugeDTO){
     const resultado = await this.conyugeUseCases.actualizarConyuge(conyugeDTO);
     return resultado;
   }

   @Get('historial_conyuges/:id')
   async getHistorial(@Param() param){
    console.log("Llamada a historial conyuges");
    this.logger.log("Llamada a historial_conyuges con id:", param.id)
     return this.conyugeUseCases.getHistorialConyuge(param.id);
   }

}