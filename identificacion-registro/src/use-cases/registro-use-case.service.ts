import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { RegistroSaludFactory, RespuestaRegistroSaludfactory } from "./registro-salud-factory.service";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { Concubino } from "src/core/entities/concubino.entity";
import { ConcubinoModel } from "src/framework/data-service/postgres/models/concubino.model";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosFamiliaresModel } from "src/framework/data-service/postgres/models/datos-familiares.model";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { DatosPersonalesModel } from "src/framework/data-service/postgres/models/datos-personales.model";
import { EducacionFormacion } from "src/core/entities/educacion-formacion.entity";
import { EducacionFormacionModel } from "src/framework/data-service/postgres/models/educacion-formacion.model";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Familiar } from "src/core/entities/familiar.entity";
import { FamiliarModel } from "src/framework/data-service/postgres/models/familiar.model";
import { GrupoSanguineo } from "src/core/entities/grupo-sanguineo.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { LimitacionIdiomaticaModel } from "src/framework/data-service/postgres/models/limitacion-idiomatica.model";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Oficio } from "src/core/entities/oficio.entity";
import { Persona } from "src/core/entities/persona.entity";
import { PersonaModel } from "src/framework/data-service/postgres/models/persona.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplModel } from "src/framework/data-service/postgres/models/ppl.model";
import { QueryRunner } from "typeorm";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RegistroDatosFamiliaresFactory } from "./registro-datos-familiares/registro-datosFamiliares.factory";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro/registro-datos-judiciales.dto";
import { RegistroDatosJudicialesFactory } from "./registro-datos-judiciales/registro-datosJudiciales.factory";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";
import { RegistroDatosPersonalesFactory } from "./registro-datosPersonales-factory.service";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { RegistroDatosSeguridadFactory } from "./registro-datos-seguridad/registro-datos-seguridad-factory.service";
import { RegistroEducacionDTO } from "src/core/dto/registro/registro-educacion.dto";
import { RegistroEducacionFormacionFactory } from "./educacion-formacion-factory.service";
import { RegistroPersonaModel } from "src/framework/data-service/postgres/models/registro-persona.model";
import { RegistroSaludDTO } from "src/core/dto/registro/registro-salud.dto";
import { RespuestaActualizacionDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-actualizacion-datos-personales.dto";
import { RespuestaEducacionFactoryDTO } from "src/core/dto/respuesta-educacion-factory.dto";
import { RespuestaRegistrarEducacionFormacionUseCaseDTO } from "src/core/dto/registro/respuesta-registrar-educacion-use-case.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/registro/respuesta-registro-datos-personales.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/registro/respuesta-registro-salud.dto";
import { SaludFisicaModel } from "src/framework/data-service/postgres/models/salud-fisica.model";
import { SaludMentalModel } from "src/framework/data-service/postgres/models/salud-mental.model";
import { SaludModel } from "src/framework/data-service/postgres/models/salud.model";
import { Seguridad } from "src/core/entities/seguridad.entity";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { Vacuna } from "src/core/entities/vacuna.entity";
import { VinculoFamiliar } from "src/core/entities/vinculo-familiar.entity";

@Injectable()
export class RegistroUseCase{
  private readonly logger = new Logger('RegistroUseCase');
  constructor(
    private dataService:IDataService,
    private registro_salud_factory:RegistroSaludFactory,
    private registro_datosPersonales_factory:RegistroDatosPersonalesFactory,
    private registro_educacionFormacion_factory:RegistroEducacionFormacionFactory,
    private registro_datosFamiliares_factory:RegistroDatosFamiliaresFactory,
    private registro_datosJudiciales_factory:RegistroDatosJudicialesFactory,
    private registro_datosSeguridad_factory:RegistroDatosSeguridadFactory,
  ){}

  async registrar(personaARegistrar:Persona, ppl:Ppl):Promise<Persona>{
    const queryRunner:QueryRunner = this.dataService.getQueryRunner();
    try{
        //Guardar Registro
        // console.log("descriptorFacial1:", personaARegistrar.registro.descriptorFacial1);
        
        await queryRunner.startTransaction()
        const registro = await queryRunner.manager.save(RegistroPersonaModel,personaARegistrar.registro);
        personaARegistrar.registro = registro;
        const personaGuardada = await queryRunner.manager.save(PersonaModel,personaARegistrar);

        // const registroGuardado = await this.dataService.registro.create(personaARegistrar.registro);
        // personaARegistrar.registro = registroGuardado;
        // const personaGuardada = await this.dataService.persona.create(personaARegistrar);
        if(personaGuardada.esPPL){
          ppl.persona = personaGuardada;
          const pplGuardado = await queryRunner.manager.save(PplModel, ppl );
        }
        await queryRunner.commitTransaction()
        return personaGuardada;
        // return null
     }catch(error){
        await queryRunner.rollbackTransaction()
        this.logger.error(`Error durante el registro:${error}`);
        throw new HttpException(`Error durante el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
     }finally{
        await queryRunner.release()
     }

     

  }

  async registrar_salud(registroSaludDTO:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    
    const registro_salud:RespuestaRegistroSaludfactory = await this.registro_salud_factory.crearRegistroSalud(registroSaludDTO);
    
    const queryRunner:QueryRunner = this.dataService.getQueryRunner();

    try{
      await queryRunner.startTransaction();
      const registroDeSaludACrear = registro_salud.registro_salud;
      const persona = registro_salud.persona;
      //Salud Mental
      const registroDeSaludMentalGuardado = await queryRunner.manager.save(SaludMentalModel,registro_salud.registro_salud_mental);
      registroDeSaludACrear.saludMental = registroDeSaludMentalGuardado;
      
      //Salud Fisica
      const registroDeSaludFisicaGuardado = await queryRunner.manager.save(SaludFisicaModel,registro_salud.registro_salud_fisica);
      registroDeSaludACrear.saludFisica = registroDeSaludFisicaGuardado;
      //Limitaciones idiomaticas
      const limitacionesIdiomaticasGuardado = await queryRunner.manager.save(LimitacionIdiomaticaModel,registro_salud.registro_limitacionesIdiomaticas);
      registroDeSaludACrear.limitacionesIdiomaticas = limitacionesIdiomaticasGuardado;

      //Finalmente guardo el registro de salud
      const registroDeSaludGuardado = await queryRunner.manager.save(SaludModel, registroDeSaludACrear);
      persona.salud = registroDeSaludGuardado;
      //Actualizar Persona
      const updatedPersona:Persona  = await queryRunner.manager.save(PersonaModel,persona);
      await queryRunner.commitTransaction()
      return {
        success:true
      }
        
    }catch(error){
      await queryRunner.rollbackTransaction()
      this.logger.error(`Error durante el registro de datos de salud:${error}`);
      throw new HttpException(`Error durante el registro de salud:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }finally{
      await queryRunner.release()
    }

  }

  async actualizar_salud(id:number,registroSaludDTO:RegistroSaludDTO){
    const registro_salud:RespuestaRegistroSaludfactory = await this.registro_salud_factory.actualizarRegistroSalud(id,registroSaludDTO);
    const queryRunner:QueryRunner = this.dataService.getQueryRunner();
    const registroSaludAActualizar = registro_salud.registro_salud;
    try{
      queryRunner.startTransaction();
      const registroSaludMentalActualizado = await queryRunner.manager.save(SaludMentalModel, registro_salud.registro_salud_mental);
      registroSaludAActualizar.saludMental = registroSaludMentalActualizado;

      const registroSaludFisicaActualizado = await queryRunner.manager.save(SaludFisicaModel, registro_salud.registro_salud_fisica);
      registroSaludAActualizar.saludFisica = registroSaludFisicaActualizado;
      
      const registroLimitacionesIdiomaticasActualizado = await queryRunner.manager.save(LimitacionIdiomaticaModel, registro_salud.registro_limitacionesIdiomaticas);
      registroSaludAActualizar.limitacionesIdiomaticas = registroLimitacionesIdiomaticasActualizado;

      const registroSaludActualizado = await queryRunner.manager.save(SaludModel,registro_salud.registro_salud);
      queryRunner.commitTransaction();
      return{
        registroSaludActualizado:registroSaludActualizado
      }
    }catch(error){
      queryRunner.rollbackTransaction();
      this.logger.error(`Ocurrio un error al actualizar el registro de Salud:${error}`);
    }finally{
      queryRunner.release();
    }
  }

  async registrar_datosPersonales(registroDatosPersonaleDTO:RegistroDatosPersonalesDTO):Promise<RespuestaRegistroDatosPersonalesDTO>{
    try{
        const datosPersonales:DatosPersonales = 
        await this.registro_datosPersonales_factory.registrarDatosPersonales(registroDatosPersonaleDTO);
        // console.log("Datos Personales:", datosPersonales);
        const datosPersonalesCreated = await this.dataService.datosPersonales.create(datosPersonales);
        return{
          sucess:true
        }
    }
    catch(error){
      this.logger.error(`Error durante el registro de datos Personales:${error}`);
      throw new HttpException(`Error durante el registro de Datos Personales:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }

  async actualizar_datosPersonales(id:number,registroDatosPersonaleDTO:RegistroDatosPersonalesDTO):Promise<RespuestaActualizacionDatosPersonalesDTO>{
    try{
      const datosPersonales = await this.registro_datosPersonales_factory.generarDatosPersonalesAActualizar(id,registroDatosPersonaleDTO);
      return {
        datosPersonalesActualizados:datosPersonales.datosPersonales,
        success:true
      }
      
    }catch(error){
      
      throw new HttpException(`Hubo un error al actualizar el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_educacion(datosEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistrarEducacionFormacionUseCaseDTO>{
    const queryRunner:QueryRunner = this.dataService.getQueryRunner();
    try{
      await queryRunner.startTransaction();
      const datosEducacionFormacion:RespuestaEducacionFactoryDTO = await this.registro_educacionFormacion_factory.generarDatosEducacionFormacion(datosEducacionDTO);
      const educacionFormalCreated = await queryRunner.manager.save(EducacionFormacionModel,datosEducacionFormacion.educacionFormacion);
      await queryRunner.commitTransaction();
      return{
        success:true,
        educacionFormacionCreated:educacionFormalCreated
      }
    
    
    }catch(error){
      await queryRunner.rollbackTransaction()
      this.logger.error(`Error durante el registro de datos de Educacion:${error}`);
      throw new HttpException(`Error durante el registro de datos de Educación:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }finally{
      await queryRunner.release()
    }
  }

  async actualizar_educacion(id:number, datosEducacionDTO:RegistroEducacionDTO):Promise<EducacionFormacion>{
    const registroDeEducacionAActualizar = await this.registro_educacionFormacion_factory.generarActualizacionEducacion(id,datosEducacionDTO);
    return await this.dataService.educacionFormacion.update(registroDeEducacionAActualizar.registroDeEducacion);
  }

  async registrar_datos_familiares(datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<DatosFamiliares>{
      const datosFamiliaresACrear = await this.registro_datosFamiliares_factory.generar_datos_familiares(datosFamiliaresDTO);
      return null;
  }

  async actualizar_datos_familiares(id:number, datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<DatosFamiliares>{
    const queryRunner:QueryRunner = this.dataService.getQueryRunner();
    try{
      const datosFamiliaresAActualizar = await this.registro_datosFamiliares_factory.actualizar_datos_familiares(id,datosFamiliaresDTO);
      queryRunner.startTransaction();
      
      const familiaresGuardados = await queryRunner.manager.save(FamiliarModel,datosFamiliaresAActualizar.datosFamiliares.familiares);
      const concubinoGuardado = await queryRunner.manager.save(ConcubinoModel, datosFamiliaresAActualizar.datosFamiliares.concubino);
     
      datosFamiliaresAActualizar.datosFamiliares.familiares = familiaresGuardados;
      datosFamiliaresAActualizar.datosFamiliares.concubino = concubinoGuardado;

      queryRunner.commitTransaction();
      return null
      
    }catch(error){
      queryRunner.rollbackTransaction();
      this.logger.error(`Error durante la actualizacion de datos familiares:${error}`);
      throw new HttpException(`Error durante la actualizacion de Datos Familiares:${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    }finally{
      queryRunner.release();
    }
  }

  async registrar_datos_judiciales(registroDatosJudiciales:RegistroDatosJudicialesDTO, oficio_judicial:Array<Express.Multer.File>, resolucion:Array<Express.Multer.File>):Promise<SituacionJudicial>{
    return await this.registro_datosJudiciales_factory.generar_datos_judiciales(registroDatosJudiciales,oficio_judicial[0],resolucion[0]);
  
  
  }


  async grupos_sanguineos():Promise<Array<GrupoSanguineo>>{
    try{
      return await this.dataService.grupo_sanguineo.getAll();
    }catch(error){
      this.logger.error(`Error durante el registro de Datos Judiciales:${error}`);
      throw new HttpException(`Error al consultar los grupos sanguineos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_datos_seguridad(registroDatosSeguridad:RegistroDatosSeguridadDTO):Promise<Seguridad>{
    try{
      const datosDeSeguridadAGuardar = await this.registro_datosSeguridad_factory.generar_datos_seguridad(registroDatosSeguridad);
      return await this.dataService.seguridad.create(datosDeSeguridadAGuardar);
    }catch(error){
      this.logger.error(`Error durante el registro de Datos de Seguridad:${error}`);
      throw new HttpException(`Error al consultar los Datos de Seeguridad`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async actualizar_datos_seguridad(id:number, datosSeguridadDTO:RegistroDatosSeguridadDTO){
    const datosDeSeguridadAActualizar = await this.registro_datosSeguridad_factory.generar_actualizacion_datos_de_seguridad(id,datosSeguridadDTO);
    try{
      return await this.dataService.seguridad.update(datosDeSeguridadAActualizar.registroDeSeguridadAActualizar);
    }catch(error){
      throw new HttpException(`Error al actualizar el registro de seguridad:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }

  async vacunas():Promise<Array<Vacuna>>{
    try{
      return await this.dataService.vacuna.getAll()
    }catch(error){
      this.logger.error(`Error al consultar las vacunas:${error}`);
      throw new HttpException(`Error al consultar las vacunas`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async nacionalidades():Promise<Array<Nacionalidad>>{
    try{
      return await this.dataService.nacionalidad.getAll();
    }catch(error){
      this.logger.error(`Error al consultar las nacionaliidades:${error}`);
      throw new HttpException('Error al consultar las nacionaliidades', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async estados_civiles():Promise<Array<EstadoCivil>>{
    try{
      return await this.dataService.estadoCivil.getAll();

    }catch(error){
      this.logger.error(`Error al consultar los estados civiles:${error}`);
      throw new HttpException('Error al consultar los estados civiles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async causas_judiciales(numeroDeIdentificacion:string):Promise<Array<CausaJudicial>>{
    try{
      
      const causas = await this.dataService.causas.getAllCausasByNumeroDeIdentificacion(numeroDeIdentificacion);
      
      return causas;
    }catch(error){
      this.logger.error(`Error al consultar las causas del PPL:${error}`)
      throw new HttpException('Error al consultar las causas del PPL', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async oficios():Promise<Array<Oficio>>{
    try{
        return await this.dataService.oficios.getAll();
    }catch(error){
      this.logger.error(`Error al consultar los oficios:${error}`)
      throw new HttpException('Error al consultar los oficios', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async establecimientos():Promise<Array<EstablecimientoPenitenciario>>{
    try{
      return await this.dataService.establecimientoPenitenciario.getAll();
    }catch(error){
      this.logger.error(`Error al consultar los establecimiento penitenciarios:${error}`)
    }
  }

  async vinculos_familiares():Promise<Array<VinculoFamiliar>>{
    try{
      return await this.dataService.vinculo_familiar.getAll()
    }catch(error){
      this.logger.error(`Error al consultar los vicnulos familiares:${error}`)
    }
  }
}