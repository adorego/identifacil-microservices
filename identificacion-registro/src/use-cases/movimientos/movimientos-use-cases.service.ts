import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { MovimientosFactory } from "./movimientos-factory.service";
import { MovimientoDTO } from "src/core/dto/movimientos/movimiento.dto";
import { RespuestaUseCaseMovimientoDTO } from "src/core/dto/movimientos/respuesta-use-case-movimiento.dto";
import { MotivoDeTrasladoDTO } from "src/core/dto/movimientos/motivo-traslado.dto";
import { MotivoDeTraslado } from "src/core/entities/motivo-traslado.entity";
import { MedidaDeSeguridadDTO } from "src/core/dto/movimientos/medida-de-seguridad.dto";
import { MedidaDeSeguridad } from "src/core/entities/medida-de-seguridad.entity";
import { CustodioDTO } from "src/core/dto/movimientos/custodio.dto";
import { Custodio } from "src/core/entities/custodio.entity";
import { ChoferDTO } from "src/core/dto/movimientos/chofer.dto";
import { Chofer } from "src/core/entities/chofer.entity";
import { VehiculoDTO } from "src/core/dto/movimientos/vehiculo.dto";
import { Vehiculo } from "src/core/entities/vehiculo.entity";
import { Movimiento } from "src/core/entities/movimiento.entity";

@Injectable()
export class MovimientosUseCases{
    private readonly logger = new Logger("MovimientosUseCases")
    constructor(
        private dataService:IDataService,
        private movimientosFactory:MovimientosFactory
    ){}

    async crearMovimiento(movimientoDTO:MovimientoDTO):Promise<RespuestaUseCaseMovimientoDTO>{
        try{
            const respuestaMovimientoFactory = await this.movimientosFactory.crearMovimiento(movimientoDTO);
            const movimientoCreado = await this.dataService.movimiento.create(respuestaMovimientoFactory.movimiento);
            return{
                success:true,
                id:movimientoCreado.id
            }
        }catch(error){
            throw new HttpException(`Error al crear el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(`Error al actualizar el traslado:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async movimientos(){
        return this.dataService.movimiento.getAll();
    }

    async movimientoById(id:number){
        return this.dataService.movimiento.get(id);
    }

    async funcionariosPorEstablecimiento(id_establecimiento:number){
        return await this.dataService.funcionario.getFuncionariosPorEstablecimiento(id_establecimiento);
    }

    async motivos_de_traslados(){
        return await this.dataService.motivoDeTraslado.getAll();
    }

    async motivos_de_traslados_por_id(id:number){
        return await this.dataService.motivoDeTraslado.get(id);
    }

    async crear_motivos_de_traslados(motivoDeTrasladoDTO:MotivoDeTrasladoDTO){
        const nuevoMotivoDeTraslado = new MotivoDeTraslado();
        nuevoMotivoDeTraslado.nombre = motivoDeTrasladoDTO.nombre;
        return await this.dataService.motivoDeTraslado.create(nuevoMotivoDeTraslado);
    }

    async actualizar_motivo_de_traslados(id:number,motivoDeTrasladoDTO:MotivoDeTrasladoDTO){
        const motivoDeTrasladoAActualizar = await this.dataService.motivoDeTraslado.get(id);
        motivoDeTrasladoAActualizar.nombre = motivoDeTrasladoDTO.nombre;
        return await this.dataService.motivoDeTraslado.update(motivoDeTrasladoAActualizar);
    }

    async medidas_de_seguridad(){
        return await this.dataService.medidaDeSeguridad.getAll();
    }

    async medidas_de_seguridad_por_id(id:number){
        return await this.dataService.medidaDeSeguridad.get(id);
    }

    async crear_medida_de_seguridad(medidaDeSeguridadDTO:MedidaDeSeguridadDTO){
        const nuevaMedidaDeSeguridad = new MedidaDeSeguridad();
        nuevaMedidaDeSeguridad.nombre = medidaDeSeguridadDTO.nombre;
        return await this.dataService.medidaDeSeguridad.create(nuevaMedidaDeSeguridad);
    }

    async actualizar_medida_de_seguridad(id:number,medidaDeSeguridadDTO:MedidaDeSeguridadDTO){
        const medidadDeSeguridadAActualizar = await this.dataService.medidaDeSeguridad.get(id);
        medidadDeSeguridadAActualizar.nombre = medidaDeSeguridadDTO.nombre;
        return await this.dataService.medidaDeSeguridad.update(medidadDeSeguridadAActualizar);
    }

    async custodios(){
        return await this.dataService.custodio.getAll();
    }

    async crear_custodio(custodioDTO:CustodioDTO){
        const nuevCustodio = new Custodio();
        nuevCustodio.nombre = custodioDTO.nombre;
        nuevCustodio.apellido = custodioDTO.apellido;
        nuevCustodio.cedula = custodioDTO.cedula;

        return await this.dataService.custodio.create(nuevCustodio);
    }

    async actualizar_custodio(id:number,custodioDTO:CustodioDTO){
        const custodioAActualizar = await this.dataService.custodio.get(id);
        custodioAActualizar.nombre = custodioDTO.nombre;
        custodioAActualizar.apellido = custodioDTO.apellido;
        custodioAActualizar.cedula = custodioDTO.cedula;
        return await this.dataService.custodio.update(custodioAActualizar);
    }

    async choferes(){
        return await this.dataService.chofer.getAll();
    }

    async crear_chofer(chooferDTO:ChoferDTO){
        const nuevoChofer = new Chofer();
        nuevoChofer.nombre = chooferDTO.nombre;
        nuevoChofer.apellido = chooferDTO.apellido;
        nuevoChofer.cedula = chooferDTO.cedula;

        return await this.dataService.chofer.create(nuevoChofer);
    }

    async actualizar_chofer(id:number,chooferDTO:CustodioDTO){
        const choferAActualizar = await this.dataService.chofer.get(id);
        choferAActualizar.nombre = chooferDTO.nombre;
        choferAActualizar.apellido = chooferDTO.apellido;
        choferAActualizar.cedula = chooferDTO.cedula;
        return await this.dataService.chofer.update(choferAActualizar);
    }

    async vehiculos(){
        return await this.dataService.vehiculo.getAll();
    }

    async crear_vehiculos(vehiculoDTO:VehiculoDTO){
       const nuevoVehiculo = new Vehiculo();
       nuevoVehiculo.anho = vehiculoDTO.anho;
       nuevoVehiculo.chapa = vehiculoDTO.chapa;
       nuevoVehiculo.chasis = vehiculoDTO.chasis;
       nuevoVehiculo.marca = vehiculoDTO.marca

        return await this.dataService.vehiculo.create(nuevoVehiculo);
    }

    async actualizar_vehiculo(id:number,vehiculoDTO:VehiculoDTO){
        const vehiculoAActualizar = await this.dataService.vehiculo.get(id);
        vehiculoAActualizar.anho = vehiculoDTO.anho;
        vehiculoAActualizar.chapa = vehiculoDTO.chapa;
        vehiculoAActualizar.chasis = vehiculoDTO.chasis;
        vehiculoAActualizar.marca = vehiculoDTO.marca
        
        return await this.dataService.vehiculo.update(vehiculoAActualizar);
    }

    async get_informe_traslados(){
        const trasladosActuales:Array<Movimiento> = await this.dataService.movimiento.getAll();
        const cantidad_de_translados = trasladosActuales.length;

        trasladosActuales.map(
            (traslado)=>{
                
            }
        )
        
    }

}