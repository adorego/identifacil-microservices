import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { MovimientosFactory } from "./movimientos-factory.service";
import { MovimientoDTO } from "src/core/dto/movimientos/movimiento.dto";

@Injectable()
export class MovimientosUseCases{
    private readonly logger = new Logger("MovimientosUseCases")
    constructor(
        private dataService:IDataService,
        private movimientosFactory:MovimientosFactory
    ){}

    async crearMovimiento(movimientoDTO:MovimientoDTO){
        try{
            const respuestaMovimientoFactory = await this.movimientosFactory.crearMovimiento(movimientoDTO);
            const movimientoCreado = await this.dataService.movimiento.create(respuestaMovimientoFactory.movimiento);
            return{
                success:true,
                id:movimientoCreado.id
            }
        }catch(error){
            throw new HttpException(`Error al crear el movimiento:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async actualizarMovimiento(id:number,movimientoDTO:MovimientoDTO){
        try{
            const respuestaMovimientoFactory = await this.movimientosFactory.actualizarMovimiento(id,movimientoDTO);
            const movimientoActualizado = await this.dataService.movimiento.update(respuestaMovimientoFactory.movimiento);
            return{
                success:true,
                id:movimientoActualizado.id
            }
        }catch(error){
            throw new HttpException(`Error al crear el movimiento:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async funcionariosPorEstablecimiento(id_establecimiento:number){
        return await this.dataService.funcionario.getFuncionariosPorEstablecimiento(id_establecimiento);
    }

    async motivos_de_traslados(){
        return await this.dataService.motivoDeTraslado.getAll();
    }

    async medidas_de_seguridad(){
        return await this.dataService.medidaDeSeguridad.getAll();
    }

    async custodios(){
        return await this.dataService.custodio.getAll();
    }

    async choferes(){
        return await this.dataService.chofer.getAll();
    }

    async vehiculos(){
        return await this.dataService.vehiculo.getAll();
    }

}