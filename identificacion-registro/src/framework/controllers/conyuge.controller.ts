import { Body, Controller, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ConyugeDTO } from "src/core/dto/conyuge/conyuge.dto";
import { IngresoConyugeDTO } from "src/core/dto/conyuge/ingreso-coyuge.dto";
import { SalidaConyugeDTO } from "src/core/dto/conyuge/salida-conyuge.dto";
import { ConyugeUseCases } from "src/use-cases/conyuge/conyuge-use-case.service";

@Controller(
    'conyuge'
)
export class ConyugeController{
  private readonly logger = new Logger('ConyugeController');
  constructor(
    private conyugeUseCases:ConyugeUseCases
  ){}

 

   @Post()
   async crearConyuge(@Body() conyugeDTO:ConyugeDTO){
     this.logger.log("Llamada a crear conyuge");
     const resultado = await this.conyugeUseCases.crearConyuge(conyugeDTO);
     return resultado;
   }

   @Put()
   async actualizarConyuge(@Body() conyugeDTO:ConyugeDTO){
     this.logger.log("Llamada a actualizar conyuge");
     const resultado = await this.conyugeUseCases.actualizarConyuge(conyugeDTO);
     return resultado;
   }

   @Get('historial_conyuges/:id')
   async getHistorial(@Param() param){
    this.logger.log("Llamada a historial_conyuges con id:", param.id)
     return this.conyugeUseCases.getHistorialConyuge(param.id);
   }

   @Get(':id')
   async getConyugeActual(@Param() param){
    this.logger.log("Llamada a get conyuge actual");
    return this.conyugeUseCases.getConyugeActual(param.id);
   }

   @Post('ingreso_conyuge')
   async ingreso_coyuge(@Body() ingresoConyugeDTO:IngresoConyugeDTO){
    this.logger.log("Llamada a ingreso_conyuge:", ingresoConyugeDTO);
     const resultado_registro = await this.conyugeUseCases.registro_ingreso_conyuge(ingresoConyugeDTO);
     return{
      id:resultado_registro.id,
      success:true
     }
   }
   

   @Post('salida_conyuge')
   async salida_coyuge(@Body() salidaConyugeDTO:SalidaConyugeDTO){
     const resultado_registro = await this.conyugeUseCases.registro_salida_conyuge(salidaConyugeDTO);
     return{
      id:resultado_registro.id,
      success:true
     }
   }
}