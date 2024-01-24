import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { RegistroSaludFactory, RespuestaRegistroSaludfactory } from "./registro-salud-factory.service";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Familiar } from "src/core/entities/familiar.entity";
import { GrupoSanguineo } from "src/core/entities/grupo-sanguineo.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Oficio } from "src/core/entities/oficio.entity";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RegistroDatosFamiliaresFactory } from "./registro-datos-familiares/registro-datosFamiliares.factory";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro-datos-judiciales.dto";
import { RegistroDatosJudicialesFactory } from "./registro-datos-judiciales/registro-datosJudiciales.factory";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro-datos-personales.dto";
import { RegistroDatosPersonalesFactory } from "./registro-datosPersonales-factory.service";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { RegistroDatosSeguridadFactory } from "./registro-datos-seguridad/registro-datos-seguridad-factory.service";
import { RegistroEducacionDTO } from "src/core/dto/registro-educacion.dto";
import { RegistroEducacionFormacionFactory } from "./educacion-formacion-factory.service";
import { RegistroSaludDTO } from "src/core/dto/registro-salud.dto";
import { RespuestaEducacionFactoryDTO } from "src/core/dto/respuesta-educacion-factory.dto";
import { RespuestaRegistrarEducacionFormacionUseCaseDTO } from "src/core/dto/respuesta-registrar-educacion-use-case.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/respuesta-registro-datos-personales.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/respuesta-registro-salud.dto";
import { Seguridad } from "src/core/entities/seguridad.entity";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { Vacuna } from "src/core/entities/vacuna.entity";

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

  async registrar(personaARegistrar:Persona):Promise<Persona>{
    //  console.log("Objecto dataService:", this.dataService);
     try{
        //Guardar Registro
        // console.log("descriptorFacial1:", personaARegistrar.registro.descriptorFacial1);
        const registroGuardado = await this.dataService.registro.create(personaARegistrar.registro);
        personaARegistrar.registro = registroGuardado;
        const personaGuardada = await this.dataService.persona.create(personaARegistrar);
        console.log("Persona registrada:", personaGuardada);
        return personaGuardada;
        // return null
     }catch(error){
        this.logger.error(`Error durante el registro:${error}`);
        throw new HttpException(`Error durante el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
     }

     

  }

  async registrar_salud(registroSaludDTO:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    
    const registro_salud:RespuestaRegistroSaludfactory = await this.registro_salud_factory.crearRegistroSalud(registroSaludDTO);
    
    try{
      const persona = registro_salud.persona;
      const updatedSalud = await this.dataService.salud.create(registro_salud.registro_salud);
      persona.salud = updatedSalud;
      const updatedSaludMental = await this.dataService.saludMental.create(registro_salud.registro_salud_mental);
      persona.salud_mental = updatedSaludMental;
      const updatedSaludFisica = await this.dataService.saludFisica.create(registro_salud.registro_salud_fisica);
      persona.salud_fisica = updatedSaludFisica;
      const updatedLimitacionesIdiomaticas = await this.dataService.limitacionesIdiomaticas.create(registro_salud.registro_limitacionesIdiomaticas);
      persona.limitacion_idiomatica = updatedLimitacionesIdiomaticas;
      
      const updatedPersona:Persona  = await this.dataService.persona.update(persona);
      return {
        success:true
      }
        
    }catch(error){
      this.logger.error(`Error durante el registro de datos de salud:${error}`);
      throw new HttpException(`Error durante el registro de salud:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
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

  async registrar_educacion(datosEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistrarEducacionFormacionUseCaseDTO>{
    try{
      const datosEducacionFormacion:RespuestaEducacionFactoryDTO = await this.registro_educacionFormacion_factory.generarDatosEducacionFormacion(datosEducacionDTO);
      const educacionFormalCreated = await this.dataService.educacionFormacion.create(datosEducacionFormacion.educacionFormacion);
      return{
        success:true,
        educacionFormacionCreated:educacionFormalCreated
      }
    
    
    }catch(error){
      this.logger.error(`Error durante el registro de datos de Educacion:${error}`);
      throw new HttpException(`Error durante el registro de datos de Educación:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_datos_familiares(datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<DatosFamiliares>{
    try{
      const datosFamiliaresACrear = await this.registro_datosFamiliares_factory.generar_datos_familiares(datosFamiliaresDTO);
      if(datosFamiliaresACrear.concubino){
        let concubinoCreado:Concubino = null;
        if(datosFamiliaresACrear.concubino){
          concubinoCreado = await this.dataService.concubino.create(datosFamiliaresACrear.concubino);
          datosFamiliaresACrear.concubino = concubinoCreado;
        }
      }
      let datosFamiliaresGuardados = await this.dataService.datosFamiliares.create(datosFamiliaresACrear);

      if(datosFamiliaresACrear.familiares){
        let familiares:Array<Familiar> = []
        if(datosFamiliaresACrear.familiares){
          datosFamiliaresACrear.familiares.map(
            async (familiar) => {
              const familiarCreado = await this.dataService.familiar.create(familiar)
              familiares.push(familiarCreado);
              
            }
          )
          datosFamiliaresGuardados.familiares = familiares;
          datosFamiliaresGuardados = await this.dataService.datosFamiliares.update(datosFamiliaresGuardados);
          
        }
      }
      return datosFamiliaresGuardados;

    
    }catch(error){
      this.logger.error(`Error durante el registro de datos familiares:${error}`);
      throw new HttpException(`Error durante el registro de datos de Datos Familiares:${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
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
}