import { IDataService } from "src/core/abstract/data-service.abstract";
import { ConyugeDTO } from "src/core/dto/conyuge/conyuge.dto";
import { ConyugeFactory } from "./conyuge-factory.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { IngresoConyugeDTO } from "src/core/dto/conyuge/ingreso-coyuge.dto";
import { IngresoVisitante } from "src/core/entities/ingreso-visitante.entity";
import { IngresoConyuge } from "src/core/entities/ingreso-coyuge.entity";
import { SalidaConyugeDTO } from "src/core/dto/conyuge/salida-conyuge.dto";
import { SalidaConyuge } from "src/core/entities/salida-conyuge.entity";

@Injectable()
export class ConyugeUseCases{
    constructor(
        private dataService:IDataService,
        private conyugeFactory:ConyugeFactory
    ){}

    async crearConyuge(conyugeDTO:ConyugeDTO){
        const datos_conyuge = await this.conyugeFactory.generar_conyuge(conyugeDTO); 
        
        datos_conyuge.concubino.tipo_de_identificacion = datos_conyuge.tipo_de_identificacion;
        datos_conyuge.concubino.datosFamiliares = datos_conyuge.datosFamiliares;
       
        const concubinoGuardado = await this.dataService.concubino.create(datos_conyuge.concubino);
       
        datos_conyuge.datosFamiliares.concubino = concubinoGuardado;
        const pplActualizado = this.dataService.datosFamiliares.update(datos_conyuge.concubino.datosFamiliares);
        return{
            success:true,
            id:concubinoGuardado.id
        }
    }

    async actualizarConyuge(conyugeDTO:ConyugeDTO){
        const datos_conyuge = await this.conyugeFactory.actualizar_conyuge(conyugeDTO); 
        
        datos_conyuge.concubino.tipo_de_identificacion = datos_conyuge.tipo_de_identificacion;
        datos_conyuge.concubino.datosFamiliares = datos_conyuge.datosFamiliares;
        const concubinoActualizado = await this.dataService.concubino.update(datos_conyuge.concubino);
        datos_conyuge.datosFamiliares.concubino = concubinoActualizado;
        const pplActualizado = this.dataService.datosFamiliares.update(datos_conyuge.datosFamiliares);
        return{
            success:true,
            id:concubinoActualizado.id
        }

    }

    async getHistorialConyuge(id_persona:number){
       
        const persona_encontrada = await this.dataService.persona.get(id_persona);
        
        if(!persona_encontrada){
            throw new HttpException("No existe la persona con ese id",HttpStatus.BAD_REQUEST);
        }
        let historial_conyuges = persona_encontrada.datosFamiliares?.concubinos_anteriores;
        if(!historial_conyuges){
            historial_conyuges = [];
        }
        return historial_conyuges;
    }

    async getConyugeActual(id_persona:number){
        const persona_encontrada = await this.dataService.persona.get(id_persona);
        
        if(!persona_encontrada){
            throw new HttpException("No existe la persona con ese id",HttpStatus.BAD_REQUEST);
        }

        const conyuge_actual = persona_encontrada.datosFamiliares.concubino;
        return conyuge_actual;
    }

    async registro_ingreso_conyuge(ingresoConyugeDTO:IngresoConyugeDTO){
       if(!ingresoConyugeDTO.ppl){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
       }

       const ppl = await this.dataService.persona.get(ingresoConyugeDTO.ppl);
       if(!ppl){
         throw new HttpException("No se encuentra el PPL enviado",HttpStatus.BAD_REQUEST);
       }

       if(!ingresoConyugeDTO.conyuge){
        throw new HttpException("Se debe enviar un conyuge valido",HttpStatus.BAD_REQUEST);
       }

        const conyugePersona = await this.dataService.persona.get(ingresoConyugeDTO.conyuge);
        if(!conyugePersona){
            throw new HttpException("El conyuge no se encuentra registrado",HttpStatus.BAD_REQUEST);
        }

        if(!ingresoConyugeDTO.establecimiento){
            throw new HttpException("Se debe enviar un establecimiento valido",HttpStatus.BAD_REQUEST);
        }

        const establecimiento = await this.dataService.establecimientoPenitenciario.get(ingresoConyugeDTO.establecimiento);
        if(!establecimiento){
            throw new HttpException("No se encuentra el establecimiento enviado",HttpStatus.BAD_REQUEST);
        }

        //Verificar si el conyuge esta habilitado

        const conyugeActual = ppl.datosFamiliares.concubino;
        if(conyugeActual.numeroDeIdentificacion !== conyugePersona.numero_identificacion){
            throw new HttpException("Esta persona no está registrada como conyuge",HttpStatus.UNAUTHORIZED);
        }

        //Control de dias de la semana
        const dias_de_visita = conyugeActual.dias_de_visita;
        const hoy = new Date().getDay() + 1; //retorna el dia normalizado, mas 1 porque getDay retorna del 0 al 6 
        const esta_habilitado = dias_de_visita.includes(hoy);
        if(!esta_habilitado){
            throw new HttpException("El día de hoy no es fecha de visita intima para este conyuge",HttpStatus.UNAUTHORIZED);
        }
         const ingreso = new IngresoConyuge();
         ingreso.ppl_a_visitar = await this.dataService.ppl.getPplByCedula(ppl.numero_identificacion);
         ingreso.conyuge = ppl.datosFamiliares.concubino;
         ingreso.fecha_ingreso = ingresoConyugeDTO.fecha;
         ingreso.hora_ingreso = ingresoConyugeDTO.hora;
         ingreso.establecimiento = establecimiento;
         ingreso.observacion = "Ingreso a la zona privada como conyuge";

         const resultado_registro = await this.dataService.ingreso_conyuge.create(ingreso);
         return{
            id:resultado_registro.id
         }
    }

    async registro_salida_conyuge(salidaConyugeDTO:SalidaConyugeDTO){
        if(!salidaConyugeDTO.ppl_que_visito){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
       }

       const ppl = await this.dataService.persona.get(salidaConyugeDTO.ppl_que_visito);
       if(!ppl){
         throw new HttpException("No se encuentra el PPL enviado",HttpStatus.BAD_REQUEST);
       }

       const ppl_que_visito = await this.dataService.ppl.getPplByCedula(ppl.numero_identificacion);
       if(!ppl_que_visito){
        throw new HttpException("No se encuentra el PPL enviado",HttpStatus.BAD_REQUEST);
      }


       if(!salidaConyugeDTO.conyuge){
        throw new HttpException("Se debe enviar un conyuge valido",HttpStatus.BAD_REQUEST);
       }

        const conyugePersona = await this.dataService.persona.get(salidaConyugeDTO.conyuge);
        if(!conyugePersona){
            throw new HttpException("El conyuge no se encuentra registrado",HttpStatus.BAD_REQUEST);
        }

        const conyugeAutorizado = ppl.datosFamiliares.concubino

        if(conyugeAutorizado.numeroDeIdentificacion !== conyugePersona.numero_identificacion){
            throw new HttpException("El conyuge no se encuentra registrado",HttpStatus.BAD_REQUEST);
        }

        if(!salidaConyugeDTO.establecimiento){
            throw new HttpException("Se debe enviar un establecimiento valido",HttpStatus.BAD_REQUEST);
        }

        const establecimiento = await this.dataService.establecimientoPenitenciario.get(salidaConyugeDTO.establecimiento);
        if(!establecimiento){
            throw new HttpException("No se encuentra el establecimiento enviado",HttpStatus.BAD_REQUEST);
        }

        const ingresos_conyuge = await this.dataService.ingreso_conyuge.getIngresosConyugeByCedula(conyugeAutorizado.numeroDeIdentificacion);

        const ingresos_sin_salida = ingresos_conyuge.filter(
            (ingreso)=>{
                return ingreso.volvio_a_salir === false
            }
        )
        
        if(ingresos_sin_salida.length === 0){
            throw new HttpException("Esta salida no tiene un ingreso asociado",HttpStatus.NOT_ACCEPTABLE);
        }else if(ingresos_sin_salida.length > 1){
            throw new HttpException("Existen mas de 1 ingreso sin una salida asociada",HttpStatus.NOT_ACCEPTABLE);
        }

        const ingreso_asociado = ingresos_sin_salida[0];
        
        
        const salidaConyuge = new SalidaConyuge();
        salidaConyuge.conyuge = conyugeAutorizado;
        salidaConyuge.ppl_que_visito = ppl_que_visito;
        salidaConyuge.fecha_salida = salidaConyugeDTO.fecha_salida;
        salidaConyuge.hora_salida = salidaConyugeDTO.hora_salida;
        salidaConyuge.establecimiento = establecimiento;
        salidaConyuge.entrada_asociada = ingreso_asociado

        

        const respuesta_registro_salida = await this.dataService.salida_conyuge.create(salidaConyuge);
        if(respuesta_registro_salida.id){
            ingreso_asociado.volvio_a_salir = true;
            const respuesta_modificacion_ingreso = await this.dataService.ingreso_conyuge.update(ingreso_asociado);
            if(!respuesta_modificacion_ingreso.id){
                throw new HttpException("Ocurrió un error al actualizar la entrada previa del conyuge",HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        return{
            id:respuesta_registro_salida.id
        }


    }

}