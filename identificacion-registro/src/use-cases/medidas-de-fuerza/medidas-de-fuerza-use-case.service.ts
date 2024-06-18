import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { MedidasDeFuerzaFactory } from "./medidas-de-fuerza-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroMedicoDTO } from "src/core/dto/medidas-de-fuerza/registro-medico.dto";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";
import { RegistroMedico } from "src/core/entities/registro-medico.entity";
import { FileService } from "src/framework/lib/files.service";
import { TipoDeMedidaDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/tipo-de-medida-de-fuerza.dto";
import { MotivoMedidaDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/motivo-de-medida-de-fuerza.dto";
import { MotivoDeMedidaDeFuerza } from "src/core/entities/motivo-de-medida-de-fuerza.entity";
import { TipoDeMedidaDeFuerzaDuplicado } from "src/framework/errors/error-tipo-medida-de-fuerza-duplicado";
import { MotivoDeMedidaDeFuerzaModel } from "src/framework/data-service/postgres/models/motivo-de-medida-de-fuerza.model";
import { ErrorMotivoDeMedidaDeFuerzaDuplicado } from "src/framework/errors/error-motivo-de-medida-de-fuerza-duplicado";

@Injectable()
export class MedidasDeFuerzaUseCase{
    constructor(
        private medidasDeFuerzaFactory:MedidasDeFuerzaFactory,
        private dataService:IDataService,
        private fileService:FileService
    ){ }

    async crear_medida_de_fuerza(medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        const resultado_generar_medida_de_fuerza = await this.medidasDeFuerzaFactory.generar_medida_de_fuerza(medidaDeFuerzaDTO);

        resultado_generar_medida_de_fuerza.medida_de_fuerza.ppl = resultado_generar_medida_de_fuerza.ppl;
        resultado_generar_medida_de_fuerza.medida_de_fuerza.tipo_de_medida_de_fuerza = resultado_generar_medida_de_fuerza.tipo_de_medida_de_fuerza;
        resultado_generar_medida_de_fuerza.medida_de_fuerza.motivo = resultado_generar_medida_de_fuerza.motivo_de_medida_de_fuerza;
        const medidaDeFuerzaGuardada = await this.dataService.medidas_de_fuerza.create(resultado_generar_medida_de_fuerza.medida_de_fuerza);
        resultado_generar_medida_de_fuerza.ppl.medidas_de_fuerza.push(medidaDeFuerzaGuardada)
        const resultado_actualizar_ppl = await this.dataService.ppl.update(resultado_generar_medida_de_fuerza.ppl);
        return{
            id:medidaDeFuerzaGuardada.id,
            success:true
        }
    }

    async actualizar_medida_de_fuerza(id:number,medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        const resultado_actualizar_medida_de_fuerza = await this.medidasDeFuerzaFactory.actualizar_medida_de_fuerza(id, medidaDeFuerzaDTO);

        resultado_actualizar_medida_de_fuerza.medida_de_fuerza.ppl = resultado_actualizar_medida_de_fuerza.ppl;
        resultado_actualizar_medida_de_fuerza.medida_de_fuerza.tipo_de_medida_de_fuerza = resultado_actualizar_medida_de_fuerza.tipo_de_medida_de_fuerza;
        resultado_actualizar_medida_de_fuerza.medida_de_fuerza.motivo = resultado_actualizar_medida_de_fuerza.motivo_de_medida_de_fuerza;
       
        const resultado_guardar_medida_de_fuerza = await this.dataService.medidas_de_fuerza.update(resultado_actualizar_medida_de_fuerza.medida_de_fuerza);
        return{
            id:resultado_guardar_medida_de_fuerza.id,
            success:true
        }
    }

    async getMedidasDeFuerza(){
        return await this.dataService.medidas_de_fuerza.getMedidasDeFuerzaConPpl()
    }

    async getMedidaDeFuerza(id:number){
       
        return await this.dataService.medidas_de_fuerza.getMedidaDeFuerzaById(id);
    }

    async crear_registro_medico(id:number,archivo:Express.Multer.File,registroMedicoDTO:RegistroMedicoDTO){
        //Validar Medida de Fuerza
        if(!id){
            throw new HttpException("El id de medida de fuerza no puede es nulo",HttpStatus.BAD_REQUEST)
        }

        const medida_de_fuerza_sin_ppl = await this.dataService.medidas_de_fuerza.get(id);
        if(!medida_de_fuerza_sin_ppl){
            throw new HttpException("No se encuentra la medida de fuerza enviada",HttpStatus.BAD_REQUEST)
        }
        
        const medida_de_fuerza_con_ppl = await this.dataService.medidas_de_fuerza.getMedidaDeFuerzaById(medida_de_fuerza_sin_ppl.id);
        const ci = medida_de_fuerza_con_ppl.ppl.persona.numero_identificacion;
        const fecha = new Date(registroMedicoDTO.fecha); 
        const nuevoRegistroMedico = new RegistroMedico();
        nuevoRegistroMedico.fecha = new Date(fecha);
        nuevoRegistroMedico.diagnostico = registroMedicoDTO.diagnostico;
        nuevoRegistroMedico.medida_de_fuerza = medida_de_fuerza_con_ppl;
        if(archivo){
            nuevoRegistroMedico.archivo_registro_medico = await this.fileService.almacenar_archivo(archivo,`registro_medico_${fecha.getDate()}_${fecha.getMonth()}_${fecha.getFullYear()}_${ci}`);
        }
        console.log("Antes de crear el registro m´dico:",nuevoRegistroMedico);
        const registroMedicoCreado = await this.dataService.registro_medico.create(nuevoRegistroMedico);
        
        medida_de_fuerza_con_ppl.registros_medicos.push(registroMedicoCreado);
        const medidaDeFuerzaActualizada = await this.dataService.medidas_de_fuerza.update(medida_de_fuerza_con_ppl);
        return{
            id:registroMedicoCreado.id
        }
    }
    
    async getRegistrosMedicos(){
        return await this.dataService.registro_medico.getAll();
    }

    async getRegistroMedico(id:number){
        return await this.dataService.registro_medico.get(id);
    }
    async actualizar_registro_medico(id:number, archivo_registro_medico:Express.Multer.File ,registroMedicoDTO:RegistroMedicoDTO){
        if(!id){
            throw new HttpException("El id de del registro medico no puede ser nulo",HttpStatus.BAD_REQUEST)
        }

        const registroMedicoEncontrado = await this.dataService.registro_medico.get(id);

        if(!registroMedicoEncontrado){
            throw new HttpException("No se encontro el registro médico enviado",HttpStatus.BAD_REQUEST)
        }


        
    }

    async crear_tipo_de_medida_de_fuerza(tipoDeMedidaDeFuerzaDTO:TipoDeMedidaDeFuerzaDTO){
        if(!tipoDeMedidaDeFuerzaDTO.nombre){
            throw new HttpException("El nombre del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        
        const tipoDeMedidasDeFuerzaActuales = await this.dataService.tipo_de_medida_de_fuerza.getAll();
        tipoDeMedidasDeFuerzaActuales.map(
            (tipo_de_medida_de_fuerza)=>{
                if(tipo_de_medida_de_fuerza.nombre.toLowerCase() === tipoDeMedidaDeFuerzaDTO.nombre.toLowerCase()){
                    throw new TipoDeMedidaDeFuerzaDuplicado("Este tipo de medida de fuerza ya existe");
                }
            }
        )
        const nuevoTipoDeMedidaDeFuerza = new TipoDeMedidaDeFuerza();
        nuevoTipoDeMedidaDeFuerza.nombre = tipoDeMedidaDeFuerzaDTO.nombre;
        const resultadoDeCrearTipoDeMedidaDeFuerza = await this.dataService.tipo_de_medida_de_fuerza.create(nuevoTipoDeMedidaDeFuerza);
        return {
            id:resultadoDeCrearTipoDeMedidaDeFuerza.id
        }
    }

    async actualizar_tipo_de_medida_de_fuerza(id:number,tipoDeMedidaDeFuerzaDTO:TipoDeMedidaDeFuerzaDTO){
        if(!id){
            throw new HttpException("El id del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        const tipoDeMedidaDeFuerzaEncontrado = await this.dataService.tipo_de_medida_de_fuerza.get(id);
        if(!tipoDeMedidaDeFuerzaEncontrado){
            throw new HttpException("No se encontró el tipo de medida de fuerza con ese ID",HttpStatus.BAD_REQUEST);
        }

        tipoDeMedidaDeFuerzaEncontrado.nombre = tipoDeMedidaDeFuerzaDTO.nombre;
        const resultadoDeCrearTipoDeMedidaDeFuerza = await this.dataService.tipo_de_medida_de_fuerza.update(tipoDeMedidaDeFuerzaEncontrado);
        return {
            id:resultadoDeCrearTipoDeMedidaDeFuerza.id
        }
    }

    async getTiposMedidaDeFuerza(){
        return await this.dataService.tipo_de_medida_de_fuerza.getAll();
    }

    async getMedidaDeFuerzaById(id:number){
        return await this.dataService.tipo_de_medida_de_fuerza.get(id);
    }

    async crear_motivo_de_medida_de_fuerza(motivoMedidaDeFuerzaDTO:MotivoMedidaDeFuerzaDTO){
        if(!motivoMedidaDeFuerzaDTO.nombre){
            throw new HttpException("El nombre del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        const motivosDeMedidaDeFuerzaActuales = await this.dataService.motivo_medida_de_fuerza.getAll();
        motivosDeMedidaDeFuerzaActuales.map(
            (motivo)=>{
                if(motivo.nombre.toLowerCase() == motivoMedidaDeFuerzaDTO.nombre.toLowerCase()){
                    throw new ErrorMotivoDeMedidaDeFuerzaDuplicado("El nombre de este motivo de medida de fuerza ya existe");
                }
            }
        )
        if(!motivoMedidaDeFuerzaDTO.descripcion){
            throw new HttpException("La descripción del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        const nuevoMotivoDeMedidaDeFuerza = new MotivoDeMedidaDeFuerza();
        nuevoMotivoDeMedidaDeFuerza.nombre = motivoMedidaDeFuerzaDTO.nombre;
        nuevoMotivoDeMedidaDeFuerza.descripcion = motivoMedidaDeFuerzaDTO.descripcion;
        const resultadoDeCrearMotivoDeMedidaDeFuerza = await this.dataService.motivo_medida_de_fuerza.create(nuevoMotivoDeMedidaDeFuerza);
        return {
            id:resultadoDeCrearMotivoDeMedidaDeFuerza.id
        }
    }

    async actualizar_motivo_de_medida_de_fuerza(id:number,motivoMedidaDeFuerzaDTO:MotivoMedidaDeFuerzaDTO){
        if(!id){
            throw new HttpException("El id del motivo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        
        if(!motivoMedidaDeFuerzaDTO.nombre){
            throw new HttpException("El nombre del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        if(!motivoMedidaDeFuerzaDTO.descripcion){
            throw new HttpException("La descripción del tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }
        const motivoDeMedidaDeFuerzaEncontrada = await this.dataService.motivo_medida_de_fuerza.get(id);
        if(!motivoDeMedidaDeFuerzaEncontrada){
            throw new HttpException("No se encontró el motivo de fuerza enviado",HttpStatus.BAD_REQUEST);
        }
        motivoDeMedidaDeFuerzaEncontrada.nombre = motivoMedidaDeFuerzaDTO.nombre;
        motivoDeMedidaDeFuerzaEncontrada.descripcion = motivoMedidaDeFuerzaDTO.descripcion;
        const resultadoDeCrearMotivoDeMedidaDeFuerza = await this.dataService.motivo_medida_de_fuerza.update(motivoDeMedidaDeFuerzaEncontrada);
        return {
            id:resultadoDeCrearMotivoDeMedidaDeFuerza.id
        }
    }

    async getMotivosMedidaDeFuerza(){
        return await this.dataService.motivo_medida_de_fuerza.getAll();
    }

    async getMotivosDeMedidaFuerzaById(id:number){
        return await this.dataService.motivo_medida_de_fuerza.get(id);
    }

}