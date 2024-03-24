import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";
import { MovimientoDTO } from "src/core/dto/movimientos/movimiento.dto";
import { MovimientosUseCases } from "src/use-cases/movimientos/movimientos-use-cases.service";

@Controller("movimientos")
export class MovimientosController{
    private readonly logger = new Logger("MovimientosController")
    constructor(
        private movimientoUseCase:MovimientosUseCases
    ){ }

    @Post()
    async create(@Body() movimientoDTO:MovimientoDTO){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.crearMovimiento(movimientoDTO);
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param() param:any, @Body() movimientoDTO:MovimientoDTO){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.actualizarMovimiento(param.id, movimientoDTO);
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('funcionarios_por_establecimiento/:id')
    async get_funcionarios_por_establecimiento(@Param() param:any){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.funcionariosPorEstablecimiento(param.id)
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('motivos_de_traslado')
    async motivos_de_traslado(){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.motivos_de_traslados();
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('medidas_de_seguridad')
    async medidas_de_seguridad(){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.medidas_de_seguridad();
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('custodios')
    async custodios(){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.custodios();
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('choferes')
    async choferes(){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.choferes();
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('vehiculos')
    async vehiculos(){
        try{
            const respuestaMovimientoUseCase = this.movimientoUseCase.choferes();
            return{
                respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}