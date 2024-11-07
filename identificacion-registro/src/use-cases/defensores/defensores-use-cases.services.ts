import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { DashBoardDataDTO } from "src/core/dto/defensores/dashboard-data.dto";
import { EntrevistaDefensorDTO } from "src/core/dto/defensores/entrevista-defensor.dto";
import { IntervencionDefensorDTO } from "src/core/dto/defensores/intervencion-defensor.dto";
import { Defensor } from "src/core/entities/defensor";
import { EntrevistaDefensor } from "src/core/entities/entrevista-defensor.entity";
import { IntervencionDefensor } from "src/core/entities/intervencion.entity";
import { FileService } from "src/framework/lib/files.service";

@Injectable()
export class DefensoresUseCases{
    constructor(
        private dataService:IDataService,
        private fileService:FileService
    ){ }

    async getDashBoardData(dashBoardDataDTO:DashBoardDataDTO){
        
    }

    async createIntervencion(intervencionDefensorDTO:IntervencionDefensorDTO, oficioJudicialAltaIntervencion:Express.Multer.File){

        if(!intervencionDefensorDTO.idDefensor){
            throw new HttpException("Se debe enviar un Defensor",HttpStatus.BAD_REQUEST);
        }

        const defensor:Defensor = await this.dataService.defensor.get(intervencionDefensorDTO.idDefensor);
        if(!defensor){
            throw new HttpException("No se encontró el defensor enviado",HttpStatus.BAD_REQUEST);
        }

        if(!intervencionDefensorDTO.idPersonaPPL){
            throw new HttpException("Se debe enviar el id del PPL a intervenir",HttpStatus.BAD_REQUEST);
        }

        const pplDePersonaID = await this.dataService.ppl.getPPLByIdPersona(intervencionDefensorDTO.idPersonaPPL);

        if(!pplDePersonaID){
            throw new HttpException("No se encontró al PPL enviado",HttpStatus.BAD_REQUEST);
        }

        console.log("Paso el error de PPL encontrado!!!");
        const ppl = await this.dataService.ppl.get(pplDePersonaID.id);

        if(!intervencionDefensorDTO.idExpediente){
            throw new HttpException("Se debe enviar el id del expediente del PPL a intervenir",HttpStatus.BAD_REQUEST);
        }

        const expediemte = await this.dataService.expediente.get(intervencionDefensorDTO.idExpediente);
        if(!expediemte){
            throw new HttpException("No se encontró el expediente enviado",HttpStatus.BAD_REQUEST);
        }

        if(!intervencionDefensorDTO.circunscripcion){
            throw new HttpException("Se debe enviar la circunscripción judicial",HttpStatus.BAD_REQUEST);
        }

        const circunscripcion = await this.dataService.circunscripcionJudicial.get(intervencionDefensorDTO.circunscripcion);
        if(!circunscripcion){
            throw new HttpException("No se encontró la circunscripción enviada",HttpStatus.BAD_REQUEST);
        }

        if(!intervencionDefensorDTO.fechaInicioProceso){
            throw new HttpException("Se debe enviar la fecha de inicio de la intervención",HttpStatus.BAD_REQUEST);
        }

        if(!oficioJudicialAltaIntervencion){
            throw new HttpException("Se debe adjuntar el oficio judicial de la intervención",HttpStatus.BAD_REQUEST);
        }

        

        const intervencion = new IntervencionDefensor();
        intervencion.defensor = defensor;
        intervencion.ppl = ppl;
        intervencion.expediente = expediemte;
        intervencion.fecha_inicio_intervencion = intervencionDefensorDTO.fechaInicioProceso;
        intervencion.fecha_fin_intervencion = intervencionDefensorDTO.fechaFinDelProceso;
        intervencion.circunscripcion = circunscripcion;
        intervencion.oficio_judicial_alta_intervencion = await this.fileService.almacenar_archivo(oficioJudicialAltaIntervencion,`oficio_alta_intervencion_defensor_id_${defensor.id}_ci_ppl_${ppl.persona.numero_identificacion}`)

        const resultado = await this.dataService.intervecion_defensores.create(intervencion);
        console.log("Resultado:",resultado);
        return resultado.id;
    }

    async getIntervenciones(id_circunscripcion:number){
        const resultado = await this.dataService.intervecion_defensores.getIntervencionesDefensoresPorCircunscripcion(id_circunscripcion);
        console.log("Resultado:", resultado);
        return resultado;
    }

    async createEntrevista(idIntervencion:number,entrevistaDefensorDTO:EntrevistaDefensorDTO){
        console.log("entrevistaDefensorDTO:",entrevistaDefensorDTO);
        if(!idIntervencion){
            throw new HttpException("Se debe enviar el id de la intervenación",HttpStatus.BAD_REQUEST);
        }
        const intervencion = await this.dataService.intervecion_defensores.get(idIntervencion);
        
        if(!intervencion){
            throw new HttpException("No se encuentra la intervención enviada",HttpStatus.BAD_REQUEST);
        }

        if(!entrevistaDefensorDTO.fechaEntrevista){
            throw new HttpException("Se debe enviar una fecha de entrevista",HttpStatus.BAD_REQUEST);
        }
        if(!entrevistaDefensorDTO.seRealizoEntrevista){
            throw new HttpException("Se debe enviar seRealizoEntrevista",HttpStatus.BAD_GATEWAY);
        }
        if(!entrevistaDefensorDTO.entrevistaPresencial){
            throw new HttpException("Se debe enviar entrevistaPresencial",HttpStatus.BAD_GATEWAY);
        }
        if(!entrevistaDefensorDTO.relatoDeEntrevista){
            throw new HttpException("Se debe enviar relatoDeEntrevista",HttpStatus.BAD_GATEWAY);
        }

        const entrevista = new EntrevistaDefensor();
        entrevista.defensor = intervencion.defensor;
        entrevista.ppl = intervencion.ppl;
        entrevista.se_realizo_la_entrevista = entrevistaDefensorDTO.seRealizoEntrevista;
        entrevista.virtual = !entrevistaDefensorDTO.entrevistaPresencial;
        entrevista.fecha = entrevistaDefensorDTO.fechaEntrevista;
        entrevista.intervencion = intervencion;
        entrevista.relato = entrevistaDefensorDTO.relatoDeEntrevista;
        
        const resultado:EntrevistaDefensor = await this.dataService.entrevista_defensor.create(entrevista);
        return resultado.id;

    }

    async getEntrevistas(idIntervencion:number){
        if(!idIntervencion){
            throw new HttpException("Se debe enviar el id de la intervención",HttpStatus.BAD_GATEWAY);
        }
        const intervencion = await this.dataService.intervecion_defensores.get(idIntervencion);
        if(!intervencion){
            throw new HttpException("No se encontró la intervencion enviada",HttpStatus.BAD_GATEWAY);
        }
        
        return intervencion.entrevistas
    }


}