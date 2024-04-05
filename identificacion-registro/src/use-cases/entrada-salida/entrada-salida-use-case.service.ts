import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { EntradaPplDTO } from "src/core/dto/entradaSalida/entrada-ppl.dto";
import { EntradaVisitanteDTO } from "src/core/dto/entradaSalida/entrada-visitante.dto";
import { ResultadoIngresoPplDTO } from "src/core/dto/entradaSalida/resultado-entrada-salida.dto";
import { ResultadoIngresoVisitanteDTO } from "src/core/dto/entradaSalida/resultado-ingreso-visitante.dto";
import { ResultadoSalidaVisitanteDTO } from "src/core/dto/entradaSalida/resultado-salida-visitante.dto";
import { SalidaVisitanteDTO } from "src/core/dto/entradaSalida/salida-visitante.dto";
import { IngresoPPL } from "src/core/entities/ingreso-ppl.entity";
import { IngresoVisitante } from "src/core/entities/ingreso-visitante.entity";
import { SalidaVisitante } from "src/core/entities/salida-visitante.entity";

@Injectable()
export class EntradaSalidaUseCase{
    constructor(
        private dataService:IDataService
    ){}

    async ingreso_ppl(entradaPplDTO:EntradaPplDTO):Promise<ResultadoIngresoPplDTO>{
        //Validaciones
        if(!entradaPplDTO.id_persona){
            throw new HttpException(`Se debe enviar un id de persona:${entradaPplDTO.id_persona}`,HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.getPPLByIdPersona(entradaPplDTO.id_persona);

        if(!pplEncontrado){
            throw new HttpException(`No se encontró el PPL enviado:${entradaPplDTO.id_persona}`,HttpStatus.BAD_REQUEST);
        }

        if(!entradaPplDTO.establecimiento){
            throw new HttpException(`Se debe enviar un establecimiento:${entradaPplDTO.id_persona}`,HttpStatus.BAD_REQUEST);
        }

        const establecimiento = await this.dataService.establecimientoPenitenciario.get(entradaPplDTO.establecimiento);
        if(!establecimiento){
            throw new HttpException(`No se encontró el establecimiento enviado:${entradaPplDTO.id_persona}`,HttpStatus.BAD_REQUEST);
        }

        const fechaReg = /^\d{4}([./-])\d{1,2}\1\d{1,2}$/;
        const horaReg = /^\d{1,2}([./-])\d{1,2}\1\d{1,4}$/

        const resultadoValidacionFecha = fechaReg.test(entradaPplDTO.fecha_ingreso);
        if(!resultadoValidacionFecha){
            throw new HttpException(`Se debe enviar una fecha valida:${entradaPplDTO.fecha_ingreso}`,HttpStatus.BAD_REQUEST);
        }
        
        const resultadoValidacionHora = horaReg.test(entradaPplDTO.hora_ingreso);
        if(!resultadoValidacionHora){
            throw new HttpException(`Se debe enviar una hora valida:${entradaPplDTO.hora_ingreso}`,HttpStatus.BAD_REQUEST);
        }

        const ingresoACrear = new IngresoPPL();
        ingresoACrear.ppl = pplEncontrado;
        ingresoACrear.establecimiento = establecimiento;
        ingresoACrear.fecha = entradaPplDTO.fecha_ingreso;
        ingresoACrear.hora = entradaPplDTO.hora_ingreso;

        const resultadoCrearEntradaPpl = await this.dataService.ingreso_ppl.create(ingresoACrear);
        
        return{
            success:true,
            id:resultadoCrearEntradaPpl.id
        }
        
    }

    async ingreso_visitante(entradaVisitanteDTO:EntradaVisitanteDTO):Promise<ResultadoIngresoVisitanteDTO>{
         //Validaciones
         if(!entradaVisitanteDTO.visitante){
             throw new HttpException(`Se debe enviar un id de persona:${entradaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
         }
         const visitanteEncontrado = await this.dataService.persona.get(entradaVisitanteDTO.visitante);

        if(!visitanteEncontrado){
             throw new HttpException(`No se encontró el registro del visitante, debe registrarse:${entradaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
         }

        if(!entradaVisitanteDTO.establecimiento){
             throw new HttpException(`Se debe enviar un establecimiento:${entradaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
         }

        const establecimiento = await this.dataService.establecimientoPenitenciario.get(entradaVisitanteDTO.establecimiento);
        if(!establecimiento){
                throw new HttpException(`No se encontró el establecimiento enviado:${entradaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
        }

        const fechaReg = /^\d{4}([./-])\d{1,2}\1\d{1,2}$/;
        const horaReg = /^\d{1,2}([./-:])\d{1,2}([./-:])\d{1,4}\d$/;

        const resultadoValidacionFecha = fechaReg.test(entradaVisitanteDTO.fecha_ingreso);
        if(!resultadoValidacionFecha){
             throw new HttpException(`Se debe enviar una fecha valida:${entradaVisitanteDTO.fecha_ingreso}`,HttpStatus.BAD_REQUEST);
         }
        
        const resultadoValidacionHora = horaReg.test(entradaVisitanteDTO.hora_ingreso);
        if(!resultadoValidacionHora){
             throw new HttpException(`Se debe enviar una hora valida:${entradaVisitanteDTO.hora_ingreso}`,HttpStatus.BAD_REQUEST);
         }

        const pplAVisitar = await this.dataService.ppl.get(entradaVisitanteDTO.ppl_a_visitar);
        if(!pplAVisitar){
                throw new HttpException(`No se encuentra el PPL a visitar:${entradaVisitanteDTO.ppl_a_visitar}`,HttpStatus.BAD_REQUEST);
        }

       const visitaAAgregar = new IngresoVisitante();
       visitaAAgregar.visitante = visitanteEncontrado;
       visitaAAgregar.establecimiento = establecimiento;
       visitaAAgregar.fecha_ingreso = entradaVisitanteDTO.fecha_ingreso;
       visitaAAgregar.hora_ingreso = entradaVisitanteDTO.hora_ingreso;
       visitaAAgregar.observacion = entradaVisitanteDTO.observacion;
       visitaAAgregar.ppl_a_visitar = pplAVisitar;
      
       const visitaAgregada = await this.dataService.ingreso_visitante.create(visitaAAgregar);

       return{
        success:true,
        id:visitaAgregada.id
       }



    }


    async salida_visitante(salidaVisitanteDTO:SalidaVisitanteDTO):Promise<ResultadoSalidaVisitanteDTO>{

        //Validaciones

        if(!salidaVisitanteDTO.visitante){
            throw new HttpException(`Se debe enviar un id de persona:${salidaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
        }
        const visitanteEncontrado = await this.dataService.persona.get(salidaVisitanteDTO.visitante);

       if(!visitanteEncontrado){
            throw new HttpException(`No se encontró el PPL enviado:${salidaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
        }

       if(!salidaVisitanteDTO.establecimiento){
            throw new HttpException(`Se debe enviar un establecimiento:${salidaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
        }

       const establecimiento = await this.dataService.establecimientoPenitenciario.get(salidaVisitanteDTO.establecimiento);
       if(!establecimiento){
               throw new HttpException(`No se encontró el establecimiento enviado:${salidaVisitanteDTO.visitante}`,HttpStatus.BAD_REQUEST);
       }

       const fechaReg = /^\d{4}([./-])\d{1,2}\1\d{1,2}$/;
       const horaReg = /^\d{1,2}([./-:])\d{1,2}([./-:])\d{1,4}\d$/;

       const resultadoValidacionFecha = fechaReg.test(salidaVisitanteDTO.fecha_salida);
       if(!resultadoValidacionFecha){
            throw new HttpException(`Se debe enviar una fecha valida:${salidaVisitanteDTO.fecha_salida}`,HttpStatus.BAD_REQUEST);
        }
       
       const resultadoValidacionHora = horaReg.test(salidaVisitanteDTO.hora_salida);
       if(!resultadoValidacionHora){
            throw new HttpException(`Se debe enviar una hora valida:${salidaVisitanteDTO.fecha_salida}`,HttpStatus.BAD_REQUEST);
        }

       const pplQueVisito = await this.dataService.ppl.get(salidaVisitanteDTO.ppl_que_visito);
       if(!pplQueVisito){
            throw new HttpException(`No se encuentra el PPL que visitó:${salidaVisitanteDTO.ppl_que_visito}`,HttpStatus.BAD_REQUEST);
       }

    //    const entradaAsociada = await this.dataService.ingreso_visitante.get(salidaVisitanteDTO.entrada_asociada);
    //    if(!entradaAsociada){
    //     throw new HttpException(`No existe la entrada asociada:${salidaVisitanteDTO.entrada_asociada}`,HttpStatus.BAD_REQUEST);
    //    }

       const salidaVisitanteAAgregar = new SalidaVisitante();
       //salidaVisitanteAAgregar.entrada_asociada = entradaAsociada;
       salidaVisitanteAAgregar.fecha_salida = salidaVisitanteDTO.fecha_salida;
       salidaVisitanteAAgregar.hora_salida = salidaVisitanteDTO.hora_salida;
       salidaVisitanteAAgregar.observacion = salidaVisitanteDTO.observacion;
       salidaVisitanteAAgregar.establecimiento = establecimiento;
       salidaVisitanteAAgregar.ppl_que_visito = pplQueVisito;
       salidaVisitanteAAgregar.visitante = visitanteEncontrado;

       const salidaVisitanteAgregado = await this.dataService.salida_visitante.create(salidaVisitanteAAgregar);
       return{
        success:true,
        id:salidaVisitanteAgregado.id
       }
    }


    
}