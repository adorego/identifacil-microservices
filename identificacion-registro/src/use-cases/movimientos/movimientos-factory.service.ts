import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { MovimientoDTO } from "src/core/dto/movimientos/movimiento.dto";
import { Movimiento } from "src/core/entities/movimiento.entity";

@Injectable()
export class MovimientosFactory{
    constructor(
        private dataService:IDataService
    ){}

    async crearMovimiento(movimientoDTO:MovimientoDTO){
        if(!movimientoDTO.numero_de_documento){
            throw new HttpException(`No se envió el número de documento`,HttpStatus.BAD_REQUEST);
        }
        const funcionario_que_autorizo = await this.dataService.funcionario.get(movimientoDTO.autorizado_por);
        if(!funcionario_que_autorizo){
            throw new HttpException(`No se el funcionario que autorizó el traslado`,HttpStatus.BAD_REQUEST);
        }
        const motivo_de_traslado = await this.dataService.motivoDeTraslado.get(movimientoDTO.motivo_de_traslado);
        if(!motivo_de_traslado){
            throw new HttpException(`No se encontró el motivo de traslado enviado`,HttpStatus.BAD_REQUEST);
        }
        let medidas_de_seguridad_encontradas=null;
        if(movimientoDTO.medidas_de_seguridad.length > 0){
            medidas_de_seguridad_encontradas = await Promise.all(movimientoDTO.medidas_de_seguridad.map(
                async (medida_de_seguridad)=>{
                    const medidadDeSeguridadEncontrada = await this.dataService.medidaDeSeguridad.get(medida_de_seguridad);
                    if(!medidadDeSeguridadEncontrada){
                        throw new HttpException(`No se encontró la medida de seguridad:${medida_de_seguridad}`,HttpStatus.BAD_REQUEST);
                    }
                    return medidadDeSeguridadEncontrada;
                }
            ))
        }
        let custodios_encontrados=null;
        if(movimientoDTO.custodios.length > 0){
            custodios_encontrados = await Promise.all(movimientoDTO.custodios.map(
                async (custodio) =>{
                    const custodioEncontrado = await this.dataService.custodio.get(custodio);
                    if(!custodioEncontrado){
                        throw new HttpException(`No se encontró la medida de seguridad:${custodio}`,HttpStatus.BAD_REQUEST);
                    }
                }
            ))
        }
        if(!movimientoDTO.chofer){
            throw new HttpException(`Se debe enviar un chofer registrado`,HttpStatus.BAD_REQUEST);
        }
        const chofer_registrado = await this.dataService.chofer.get(movimientoDTO.chofer);
        if(!chofer_registrado){
            throw new HttpException(`No se encontro al chofer enviado:${movimientoDTO.chofer}`,HttpStatus.BAD_REQUEST);
        }
        
        if(!movimientoDTO.vehiculo){
            throw new HttpException(`Se debe enviar un vehiculo registrado`,HttpStatus.BAD_REQUEST);
        }
        const vehiculo_registrado = await this.dataService.vehiculo.get(movimientoDTO.vehiculo);
        if(!vehiculo_registrado){
            throw new HttpException(`No se encontro el vehiculo enviado:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.fecha_de_documento){
            throw new HttpException(`Se debe enviar una fecha de documento válida:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.fecha_de_traslado){
            throw new HttpException(`Se debe enviar una fecha de traslado válida:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.origenTraslado){
            throw new HttpException(`Se debe enviar un Origen de Establecimiento válido:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        const establecimiento_origen = await this.dataService.establecimientoPenitenciario.get(movimientoDTO.origenTraslado);
        if(!establecimiento_origen){
            throw new HttpException(`Se se encontró el Establecimiento Origen:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.destinoTraslado){
            throw new HttpException(`Se debe enviar un Establecimiento destino válido:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        const establecimiento_destino = await this.dataService.establecimientoPenitenciario.get(movimientoDTO.destinoTraslado);
        if(!establecimiento_destino){
            throw new HttpException(`Se se encontró el Establecimiento Destino:${movimientoDTO.destinoTraslado}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.ppls || (movimientoDTO.ppls.length == 0 )){
            throw new HttpException(`Debe enviarse lista de PPLs o PPL válido`,HttpStatus.BAD_REQUEST);
        }

        let ppls_encontrados=null;
        if(movimientoDTO.ppls.length > 0){
            ppls_encontrados = await Promise.all(movimientoDTO.ppls.map(
                async (ppl) =>{
                    const pplEncontrado = await this.dataService.ppl.get(ppl);
                    if(!pplEncontrado){
                        throw new HttpException(`No se encontró la medida de seguridad:${ppl}`,HttpStatus.BAD_REQUEST);
                    }
                }
            ))
        }
        const movimientoACrear = new Movimiento();
        movimientoACrear.numero_de_documento = movimientoDTO.numero_de_documento;
        movimientoACrear.autorizado_por = funcionario_que_autorizo;
        movimientoACrear.motivo_de_traslado = motivo_de_traslado;
        movimientoACrear.medidas_de_seguridad = medidas_de_seguridad_encontradas;
        movimientoACrear.fecha_de_documento = new Date(movimientoDTO.fecha_de_documento);
        movimientoACrear.fecha_de_traslado = new Date(movimientoDTO.fecha_de_traslado);
        movimientoACrear.descripcion_motivo = movimientoDTO.descripcion_motivo;
        movimientoACrear.custodios = custodios_encontrados;
        movimientoACrear.chofer = chofer_registrado;
        movimientoACrear.vehiculo = vehiculo_registrado;
        movimientoACrear.origenTraslado = establecimiento_origen;
        movimientoACrear.destinoTraslado = establecimiento_destino;
        movimientoACrear.ppls = ppls_encontrados;

        return{
            movimiento:movimientoACrear
        }
    }

    async actualizarMovimiento(id:number,movimientoDTO:MovimientoDTO){
        if(!id){
            throw new HttpException(`Se debe emviar un id de Movimiento`,HttpStatus.BAD_REQUEST);
        }
        if(!movimientoDTO.numero_de_documento){
            throw new HttpException(`No se envió el número de documento`,HttpStatus.BAD_REQUEST);
        }
        const funcionario_que_autorizo = await this.dataService.funcionario.get(movimientoDTO.autorizado_por);
        if(!funcionario_que_autorizo){
            throw new HttpException(`No se el funcionario que autorizó el traslado`,HttpStatus.BAD_REQUEST);
        }
        const motivo_de_traslado = await this.dataService.motivoDeTraslado.get(movimientoDTO.motivo_de_traslado);
        if(!motivo_de_traslado){
            throw new HttpException(`No se encontró el motivo de traslado enviado`,HttpStatus.BAD_REQUEST);
        }
        let medidas_de_seguridad_encontradas=null;
        if(movimientoDTO.medidas_de_seguridad.length > 0){
            medidas_de_seguridad_encontradas = await Promise.all(movimientoDTO.medidas_de_seguridad.map(
                async (medida_de_seguridad)=>{
                    const medidadDeSeguridadEncontrada = await this.dataService.medidaDeSeguridad.get(medida_de_seguridad);
                    if(!medidadDeSeguridadEncontrada){
                        throw new HttpException(`No se encontró la medida de seguridad:${medida_de_seguridad}`,HttpStatus.BAD_REQUEST);
                    }
                    return medidadDeSeguridadEncontrada;
                }
            ))
        }
        let custodios_encontrados=null;
        if(movimientoDTO.custodios.length > 0){
            custodios_encontrados = await Promise.all(movimientoDTO.custodios.map(
                async (custodio) =>{
                    const custodioEncontrado = await this.dataService.custodio.get(custodio);
                    if(!custodioEncontrado){
                        throw new HttpException(`No se encontró la medida de seguridad:${custodio}`,HttpStatus.BAD_REQUEST);
                    }
                }
            ))
        }
        if(!movimientoDTO.chofer){
            throw new HttpException(`Se debe enviar un chofer registrado`,HttpStatus.BAD_REQUEST);
        }
        const chofer_registrado = await this.dataService.chofer.get(movimientoDTO.chofer);
        if(!chofer_registrado){
            throw new HttpException(`No se encontro al chofer enviado:${movimientoDTO.chofer}`,HttpStatus.BAD_REQUEST);
        }
        
        if(!movimientoDTO.vehiculo){
            throw new HttpException(`Se debe enviar un vehiculo registrado`,HttpStatus.BAD_REQUEST);
        }
        const vehiculo_registrado = await this.dataService.vehiculo.get(movimientoDTO.vehiculo);
        if(!vehiculo_registrado){
            throw new HttpException(`No se encontro el vehiculo enviado:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.fecha_de_documento){
            throw new HttpException(`Se debe enviar una fecha de documento válida:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.fecha_de_traslado){
            throw new HttpException(`Se debe enviar una fecha de traslado válida:${movimientoDTO.vehiculo}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.origenTraslado){
            throw new HttpException(`Se debe enviar un Origen de Establecimiento válido:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        const establecimiento_origen = await this.dataService.establecimientoPenitenciario.get(movimientoDTO.origenTraslado);
        if(!establecimiento_origen){
            throw new HttpException(`Se se encontró el Establecimiento Origen:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.destinoTraslado){
            throw new HttpException(`Se debe enviar un Establecimiento destino válido:${movimientoDTO.origenTraslado}`,HttpStatus.BAD_REQUEST);
        }

        const establecimiento_destino = await this.dataService.establecimientoPenitenciario.get(movimientoDTO.destinoTraslado);
        if(!establecimiento_destino){
            throw new HttpException(`Se se encontró el Establecimiento Destino:${movimientoDTO.destinoTraslado}`,HttpStatus.BAD_REQUEST);
        }

        if(!movimientoDTO.ppls || (movimientoDTO.ppls.length == 0 )){
            throw new HttpException(`Debe enviarse lista de PPLs o PPL válido`,HttpStatus.BAD_REQUEST);
        }

        let ppls_encontrados=null;
        if(movimientoDTO.ppls.length > 0){
            ppls_encontrados = await Promise.all(movimientoDTO.ppls.map(
                async (ppl) =>{
                    const pplEncontrado = await this.dataService.ppl.get(ppl);
                    if(!pplEncontrado){
                        throw new HttpException(`No se encontró la medida de seguridad:${ppl}`,HttpStatus.BAD_REQUEST);
                    }
                }
            ))
        }
        const movimientoAModificar = await this.dataService.movimiento.get(id);
        movimientoAModificar.numero_de_documento = movimientoDTO.numero_de_documento;
        movimientoAModificar.autorizado_por = funcionario_que_autorizo;
        movimientoAModificar.motivo_de_traslado = motivo_de_traslado;
        movimientoAModificar.medidas_de_seguridad = medidas_de_seguridad_encontradas;
        movimientoAModificar.fecha_de_documento = new Date(movimientoDTO.fecha_de_documento);
        movimientoAModificar.fecha_de_traslado = new Date(movimientoDTO.fecha_de_traslado);
        movimientoAModificar.descripcion_motivo = movimientoDTO.descripcion_motivo;
        movimientoAModificar.custodios = custodios_encontrados;
        movimientoAModificar.chofer = chofer_registrado;
        movimientoAModificar.vehiculo = vehiculo_registrado;
        movimientoAModificar.origenTraslado = establecimiento_origen;
        movimientoAModificar.destinoTraslado = establecimiento_destino;
        movimientoAModificar.ppls = ppls_encontrados;

        return{
            movimiento:movimientoAModificar
        }
    }
}