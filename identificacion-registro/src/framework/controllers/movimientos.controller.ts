import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";
import { ChoferDTO } from "src/core/dto/movimientos/chofer.dto";
import { CustodioDTO } from "src/core/dto/movimientos/custodio.dto";
import { MedidaDeSeguridadDTO } from "src/core/dto/movimientos/medida-de-seguridad.dto";
import { MotivoDeTrasladoDTO } from "src/core/dto/movimientos/motivo-traslado.dto";
import { MovimientoDTO } from "src/core/dto/movimientos/movimiento.dto";
import { VehiculoDTO } from "src/core/dto/movimientos/vehiculo.dto";
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
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crearMovimiento(movimientoDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param() param:any, @Body() movimientoDTO:MovimientoDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizarMovimiento(param.id, movimientoDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getMovimientos(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.movimientos();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getPorId/:id')
    async getMovimientosById(@Param() param){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.movimientoById(param.id);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('funcionarios_por_establecimiento/:id')
    async get_funcionarios_por_establecimiento(@Param() param:any){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.funcionariosPorEstablecimiento(param.id)
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('motivos_de_traslado')
    async motivos_de_traslado(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.motivos_de_traslados();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('motivos_de_traslado')
    async motivos_de_traslado_create(@Body() motivoDeTrasladoDTO:MotivoDeTrasladoDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crear_motivos_de_traslados(motivoDeTrasladoDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('motivos_de_traslado/:id')
    async motivos_de_traslado_update(@Param() param, @Body() motivoDeTrasladoDTO:MotivoDeTrasladoDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizar_motivo_de_traslados(param.id,motivoDeTrasladoDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('motivos_de_traslado/:id')
    async motivos_de_traslado_por_id(@Param() param){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.motivos_de_traslados_por_id(param.id);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){

        }
    }

    @Get('medidas_de_seguridad')
    async medidas_de_seguridad(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.medidas_de_seguridad();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('medidas_de_seguridad/:id')
    async medidas_de_seguridad_por_id(@Param() param){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.medidas_de_seguridad_por_id(param.id);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('medidas_de_seguridad')
    async medidas_de_seguridad_create(@Body() medidaDeSeguridadDTO:MedidaDeSeguridadDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crear_medida_de_seguridad(medidaDeSeguridadDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Put('medidas_de_seguridad/:id')
    async medidas_de_seguridad_update(@Param() param, @Body() medidaDeSeguridadDTO:MedidaDeSeguridadDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizar_medida_de_seguridad(param.id,medidaDeSeguridadDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('custodios')
    async custodios(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.custodios();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('custodios')
    async custodios_create(@Body() custodiosDTO:CustodioDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crear_custodio(custodiosDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('custodios/:id')
    async custodios_update(@Param() param, @Body() custodiosDTO:CustodioDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizar_custodio(param.id,custodiosDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('choferes')
    async choferes(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.choferes();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('choferes')
    async choferes_create(@Body() choferDTO:ChoferDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crear_chofer(choferDTO)
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('choferes/:id')
    async chofer_update(@Param() param, @Body() choferDTO:ChoferDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizar_chofer(param.id,choferDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('vehiculos')
    async vehiculos(){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.vehiculos();
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('vehiculos')
    async vehiculo_create(@Body() vehiculoDTO:VehiculoDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.crear_vehiculos(vehiculoDTO)
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('vehiculos/:id')
    async vehiculo_update(@Param() param, @Body() vehiculoDTO:VehiculoDTO){
        try{
            const respuestaMovimientoUseCase = await this.movimientoUseCase.actualizar_vehiculo(param.id,vehiculoDTO);
            return{
                ...respuestaMovimientoUseCase
            }
        }catch(error){
            throw new HttpException(`Ocurrio un error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('informe_traslados')
    async get_informe_traslados(){
        //Cantidad de traslados por mes
        const trasladosActuales = await this.movimientoUseCase
        //Cantidad de traslados por PPL

    }

    

}