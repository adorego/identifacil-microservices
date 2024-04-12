import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Familiar } from "src/core/entities/familiar.entity";
import { GrupoSanguineo } from "src/core/entities/grupo-sanguineo.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Oficio } from "src/core/entities/oficio.entity";
import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RegistroDatosFamiliaresFactory } from "./registro-datos-familiares/registro-datosFamiliares.factory";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro_datos_judiciales/registro-datos-judiciales.dto";
import { RegistroDatosJudicialesFactory } from "./registro-datos-judiciales/registro-datosJudiciales.factory";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";
import { RegistroDatosPersonalesFactory } from "./registro-datosPersonales-factory.service";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { RegistroDatosSeguridadFactory } from "./registro-datos-seguridad/registro-datos-seguridad-factory.service";
import { RegistroEducacionDTO } from "src/core/dto/registro/registro-educacion.dto";
import { RegistroEducacionFormacionFactory } from "./educacion-formacion-factory.service";
import { RegistroSaludDTO } from "src/core/dto/registro_salud/registro-salud.dto";
import { RegistroSaludFactory } from "./registro-datos-salud/registro-salud-factory.service";
import { RespuestaActualizacionDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-actualizacion-datos-personales.dto";
import { RespuestaDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-factory-registro-datos-personales.dto";
import { RespuestaRegistrarDatosFamiliaresDTO } from "src/core/dto/registro_familiar/respuesta-registrar-datos-familiares.dto";
import { RespuestaRegistrarEducacionFormacionUseCaseDTO } from "src/core/dto/registro/respuesta-registrar-educacion-use-case.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/registro/respuesta-registro-datos-personales.dto";
import { RespuestaRegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/respuesta-registro-seguridad.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/registro/respuesta-registro-salud.dto";
import { Vacuna } from "src/core/entities/vacuna.entity";
import { VinculoFamiliar } from "src/core/entities/vinculo-familiar.entity";
import { RespuestActualizarDatosEducacionDTO } from "src/core/dto/registro_datos_educacion/respuesta-actualizar-datos-educacion.dto";
import { RespuestaRegistroDatosDTO } from "src/core/dto/respuesta-registro-datos.dto";
import { RespuestaRegistroJudicialDTO } from "src/core/dto/registro_datos_judiciales/respuesta-registro-datosJudiciales.dto";
import { RegistroDeFotosDTO } from "src/core/dto/registro/registro-de-fotos.dto";
import { RegistroFactory } from "./registro-factory.services";
import { RegistroFoto } from "src/core/entities/registro_foto.entity";
import { Departamento } from "src/core/entities/departamento.entity";

interface fotosDePPL{
  foto1:Array<Express.Multer.File>;
  foto2:Array<Express.Multer.File>;
  foto3:Array<Express.Multer.File>;
  foto4:Array<Express.Multer.File>;
  foto5:Array<Express.Multer.File>;
}

@Injectable()
export class RegistroUseCase{
  private readonly logger = new Logger('RegistroUseCase');
  constructor(
    private dataService:IDataService,
    private registroFactory:RegistroFactory,
    private registroSaludFactory:RegistroSaludFactory,
    private registro_datosPersonales_factory:RegistroDatosPersonalesFactory,
    private registro_educacionFormacion_factory:RegistroEducacionFormacionFactory,
    private registro_datosFamiliares_factory:RegistroDatosFamiliaresFactory,
    private registro_datosJudiciales_factory:RegistroDatosJudicialesFactory,
    private registro_datosSeguridad_factory:RegistroDatosSeguridadFactory,
  ){}

  async registrar(personaARegistrar:Persona, ppl:Ppl):Promise<Persona>{
    this.logger.log("Llamado a registrar PPL, datos:", personaARegistrar);
     try{
        //Guardar Registro
        // console.log("descriptorFacial1:", personaARegistrar.registro.descriptorFacial1);
        const registroGuardado = await this.dataService.registro.create(personaARegistrar.registro);
        personaARegistrar.registro = registroGuardado;
        const personaGuardada = await this.dataService.persona.create(personaARegistrar);
        if(personaGuardada.esPPL){
          ppl.persona = personaGuardada;
          const pplGuardado = await this.dataService.ppl.create(ppl);
        }
        return personaGuardada;
        // return null
     }catch(error){
        this.logger.error(`Error durante el registro:${error}`);
        throw new HttpException(`Error durante el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
     }

     

  }

  async registrar_fotos(fotos:fotosDePPL,registroDeFotosDTO:RegistroDeFotosDTO){
    //console.log("fotos:",fotos,"registroDeFotos:",registroDeFotosDTO);
    const respuestaRegistroFactory = 
    await this.registroFactory.generar_registro_de_fotos(
      fotos.foto1,
      registroDeFotosDTO.nombre_foto1,
      fotos.foto2,
      registroDeFotosDTO.nombre_foto2,
      fotos.foto3,
      registroDeFotosDTO.nombre_foto3,
      fotos.foto4,
      registroDeFotosDTO.nombre_foto4,
      fotos.foto5,
      registroDeFotosDTO.nombre_foto5,
      registroDeFotosDTO.id_persona
      )
    
      const registro_fotos_creado:Array<RegistroFoto> = new Array<RegistroFoto>();
      for(let i=0;i<respuestaRegistroFactory.registro_de_fotos.length;i++){
        const registro_foto = await this.dataService.registro_foto.create(respuestaRegistroFactory.registro_de_fotos[i]);
        registro_fotos_creado.push(registro_foto);
      }

      respuestaRegistroFactory.ppl.registro_de_fotos = registro_fotos_creado;
      const pplActualizado = await this.dataService.ppl.update(respuestaRegistroFactory.ppl);
      
    
    return{
      success:true,
      registro_fotos:pplActualizado.registro_de_fotos,
      id: pplActualizado.id
      

    }
  }

  async actualizar_fotos(fotos:fotosDePPL,registroDeFotosDTO:RegistroDeFotosDTO){
    //console.log("fotos:",fotos,"registroDeFotos:",registroDeFotosDTO);
    const respuestaRegistroFactory = 
    await this.registroFactory.generar_registro_de_fotos(
      fotos.foto1,
      registroDeFotosDTO.nombre_foto1,
      fotos.foto2,
      registroDeFotosDTO.nombre_foto2,
      fotos.foto3,
      registroDeFotosDTO.nombre_foto3,
      fotos.foto4,
      registroDeFotosDTO.nombre_foto4,
      fotos.foto5,
      registroDeFotosDTO.nombre_foto5,
      registroDeFotosDTO.id_persona
      )
     
      const registros_fotos_creado = await Promise.all(respuestaRegistroFactory.registro_de_fotos.map(
        async (registro_foto)=>{
          const registro_foto_creado = await this.dataService.registro_foto.create(registro_foto);
          return registro_foto_creado;
        }
      ))

      respuestaRegistroFactory.ppl.registro_de_fotos = registros_fotos_creado;

      const pplActualizado = await this.dataService.ppl.update(respuestaRegistroFactory.ppl);

      return{
        success:true,
        registro_fotos:pplActualizado.registro_de_fotos,
        id: pplActualizado.id
        
  
      }
  }

  async registrar_salud(registroSaludDTO:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    
    try{
      const registrosGeneradosPorFactory = await this.registroSaludFactory.generarRegistroSalud(registroSaludDTO);
      const saludMentalGuardado = await this.dataService.saludMental.create(registrosGeneradosPorFactory.registro_salud_mental);
      const saludFisicaGuardado = await this.dataService.saludFisica.create(registrosGeneradosPorFactory.registro_salud_fisica);
      const limitacionIdiomaticaGuardada = await this.dataService.limitacionesIdiomaticas.create(registrosGeneradosPorFactory.registro_limitacionesIdiomaticas);
      const registroSaludACrear = registrosGeneradosPorFactory.registro_salud;
      //console.log("Registro salud a crear:", registroSaludACrear);
      registroSaludACrear.saludMental = saludMentalGuardado;
      registroSaludACrear.saludFisica = saludFisicaGuardado;
      registroSaludACrear.limitacionesIdiomaticas = limitacionIdiomaticaGuardada;
      const registroCreado = await this.dataService.salud.create(registroSaludACrear);
      return{
        success:true,
        id:registroCreado.id
      }
      

    }catch(error){
      this.logger.error(`Error durante el registro de datos de salud:${error}`);
      throw new HttpException(`Error durante el registro de salud:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async actualizar_salud(id:number,registroSaludDTO:RegistroSaludDTO){
    try{
      const respuestaDeRegistroDeSaludFactory = await this.registroSaludFactory.actualizarRegistroSalud(id,registroSaludDTO);
      const registroSaludMentalGuardada = await this.dataService.saludMental.update(respuestaDeRegistroDeSaludFactory.registro_salud_mental);
      const registroSaludFisicaGuardada = await this.dataService.saludFisica.update(respuestaDeRegistroDeSaludFactory.registro_salud_fisica);
      const registroLimitacionesIdiomaticasGuardada = await this.dataService.limitacionesIdiomaticas.update(respuestaDeRegistroDeSaludFactory.registro_limitacionesIdiomaticas);
      const registroSaludAActualizar = respuestaDeRegistroDeSaludFactory.registro_salud;
      registroSaludAActualizar.saludMental = registroSaludMentalGuardada;
      registroSaludAActualizar.saludFisica = registroSaludFisicaGuardada;
      registroSaludAActualizar.limitacionesIdiomaticas = registroLimitacionesIdiomaticasGuardada;
      const registroSaludActualizado = await this.dataService.salud.update(registroSaludAActualizar);
    
      return{
        success:true,
        id:registroSaludActualizado.id
      }
    }catch(error){
      this.logger.error(`Error durante el registro de datos de salud:${error}`);
      throw new HttpException(`Error durante el registro de salud:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_datosPersonales(registroDatosPersonaleDTO:RegistroDatosPersonalesDTO):Promise<RespuestaRegistroDatosPersonalesDTO>{
    try{
        const respuestaFactoryDatosPersonales:RespuestaDatosPersonalesDTO
        = await this.registro_datosPersonales_factory.registrarDatosPersonales(registroDatosPersonaleDTO);
        const datosPersonalesACrear = respuestaFactoryDatosPersonales.datosPersonales;
        datosPersonalesACrear.estadoCivil = respuestaFactoryDatosPersonales.estado_civil;
        datosPersonalesACrear.nacionalidad = respuestaFactoryDatosPersonales.nacionalidad;
        datosPersonalesACrear.persona = respuestaFactoryDatosPersonales.persona
        if(respuestaFactoryDatosPersonales.persona.es_extranjero && respuestaFactoryDatosPersonales.contactoEnEmbajada){

          const contactoEnEmbajadaACrear = respuestaFactoryDatosPersonales.contactoEnEmbajada;
          const contactoEnEmbajadaCreado = await this.dataService.contactoDeEmbajada.create(contactoEnEmbajadaACrear);
          const personaAActualizar = datosPersonalesACrear.persona;
          
          personaAActualizar.contactoDeEmbajadaoConsulado = contactoEnEmbajadaCreado;
          const personActualizada = await this.dataService.persona.update(personaAActualizar);
        }
        

        

        //console.log("Datos personales:", datosPersonalesACrear);
        const datosPersonalesCreados = await this.dataService.datosPersonales.create(datosPersonalesACrear);
        return{
          id:datosPersonalesCreados.id,
          success:true
        }
    }
    catch(error){
      this.logger.error(`Error durante el registro de datos Personales:${error}`);
      throw new HttpException(`Error durante el registro de Datos Personales:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }

  async actualizar_datosPersonales(id:number,registroDatosPersonaleDTO:RegistroDatosPersonalesDTO):Promise<RespuestaActualizacionDatosPersonalesDTO>{
    try{
      const respuestaFactoryActualizarDatosPersonales = await this.registro_datosPersonales_factory.generarDatosPersonalesAActualizar(id,registroDatosPersonaleDTO);
      const datosPersonales = respuestaFactoryActualizarDatosPersonales.datosPersonales;
      datosPersonales.nacionalidad = respuestaFactoryActualizarDatosPersonales.nacionalidad;
      datosPersonales.estadoCivil = respuestaFactoryActualizarDatosPersonales.estado_civil;
      
      if(respuestaFactoryActualizarDatosPersonales.persona.es_extranjero && respuestaFactoryActualizarDatosPersonales.contactoEnEmbajada){
        const contactoEnEmbajadaACrear = respuestaFactoryActualizarDatosPersonales.contactoEnEmbajada;
        const contactoEnEmbajadaCreado = await this.dataService.contactoDeEmbajada.create(contactoEnEmbajadaACrear);
        const personaAActualizar = respuestaFactoryActualizarDatosPersonales.persona;
        personaAActualizar.contactoDeEmbajadaoConsulado = contactoEnEmbajadaCreado;
        const personActualizada = await this.dataService.persona.update(personaAActualizar);
      }
      const datosPersonalesActualizados = await this.dataService.datosPersonales.update(datosPersonales);
      
      
      return {
        id:datosPersonalesActualizados.id,
        success:true
      }
      
    }catch(error){
      this.logger.error(`Hubo un error al actualizar el registro:${error}`);
      throw new HttpException(`Hubo un error al actualizar el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_educacion(datosEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistrarEducacionFormacionUseCaseDTO>{
    try{

      const respuestaEducacionFactory = await this.registro_educacionFormacion_factory.generarDatosEducacionFormacion(datosEducacionDTO);
      const registroEducacionAGuardar = respuestaEducacionFactory.educacionFormacion;
      const persona = respuestaEducacionFactory.persona;
      registroEducacionAGuardar.persona = persona;
      const respuestaGuardarRegistro = await this.dataService.educacionFormacion.create(registroEducacionAGuardar);
      return{
        success:true,
        id:respuestaGuardarRegistro.id
      }
    
    
    }catch(error){
      this.logger.error(`Error durante el registro de datos de Educacion:${error}`);
      throw new HttpException(`Error durante el registro de datos de Educación:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    
    }
  }

  async actualizar_educacion(id:number, datosEducacionDTO:RegistroEducacionDTO):Promise<RespuestActualizarDatosEducacionDTO>{
    try{
      const respuestaFactoryActualizacionEducacion = await this.registro_educacionFormacion_factory.generarActualizacionEducacion(id,datosEducacionDTO);
      const registradoAActualizar = respuestaFactoryActualizacionEducacion.registroDeEducacion;
      const persona = respuestaFactoryActualizacionEducacion.persona

      console.log("Antes de guardar:", respuestaFactoryActualizacionEducacion.registroDeEducacion);
      const resultadoGuardarEducacion = await this.dataService.educacionFormacion.update(respuestaFactoryActualizacionEducacion.registroDeEducacion);
      return{
        success:true,
        id:resultadoGuardarEducacion.id
      }
    }catch(error){
      this.logger.error("Error al actualizar el registro de Educacion");
      throw new HttpException("Error al actualizar el registro de Educacion:", error);
    }
  }

  async registrar_datos_familiares(datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaRegistrarDatosFamiliaresDTO>{
    try{  
      const datosFamiliaresACrear = await this.registro_datosFamiliares_factory.generar_datos_familiares(datosFamiliaresDTO);
      const concubino = datosFamiliaresACrear.concubino;
      console.log("Llego hasta aca");
      let concubinoGuardado = null;
      if(concubino){
        console.log("Se va a guardar el concubino:",concubino);
        concubinoGuardado = await this.dataService.concubino.create(concubino);
      }
      let familiaresGuardados:Array<Familiar> = null;
      if(datosFamiliaresACrear.familiares && datosFamiliaresACrear.familiares.length > 0){
        familiaresGuardados = await Promise.all(datosFamiliaresACrear.familiares.map(
          async (familiar) =>{
            return await this.dataService.familiar.create(familiar);

          }
        ))
       }
      
      const registroFamiliarAGuardar = datosFamiliaresACrear.datosFamiliares;
      registroFamiliarAGuardar.familiares = familiaresGuardados;
      registroFamiliarAGuardar.concubino = concubinoGuardado;
      registroFamiliarAGuardar.persona = datosFamiliaresACrear.persona;
      const registroFamiliarGuardado = await this.dataService.datosFamiliares.create(registroFamiliarAGuardar);
      if(!registroFamiliarAGuardar){
        throw new HttpException("Error al guardar el registro familiar",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return{
          success:true,
          id:registroFamiliarGuardado.id
        }
      
      
    }catch(error){
      this.logger.error(`Error durante el registro de datos familiares:${error}`);
      throw new HttpException(`Error durante el registro de datos Familiares:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    
    }
  }

  async actualizar_datos_familiares(id:number, datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaRegistrarDatosFamiliaresDTO>{
    
    try{
      const datosFamiliaresAActualizar = await this.registro_datosFamiliares_factory.actualizar_datos_familiares(id, datosFamiliaresDTO);
      const concubino = datosFamiliaresAActualizar.concubino;
      
      let concubinoGuardado = null;
      if(concubino && concubino.id){
        concubinoGuardado = await this.dataService.concubino.update(concubino);
      }else if(concubino){
        concubinoGuardado = await this.dataService.concubino.create(concubino);
      }
      console.log("Concubino a crear:", concubino);
      let familiaresGuardados:Array<Familiar> = null;
      if(datosFamiliaresAActualizar.familiares && datosFamiliaresAActualizar.familiares.length > 0){
        familiaresGuardados = await Promise.all(datosFamiliaresAActualizar.familiares.map(
          async (familiar) =>{
            return await this.dataService.familiar.create(familiar);
          }
        ))
       }
       
       const registroFamiliarAGuardar = datosFamiliaresAActualizar.datosFamiliares;
       const concubinoAEliminar = registroFamiliarAGuardar.concubino;
       registroFamiliarAGuardar.familiares = familiaresGuardados;
       registroFamiliarAGuardar.concubino = concubinoGuardado;
       registroFamiliarAGuardar.persona = datosFamiliaresAActualizar.persona;
       registroFamiliarAGuardar.id = datosFamiliaresAActualizar.datosFamiliares.id;
       const registroFamiliarGuardado = await this.dataService.datosFamiliares.update(registroFamiliarAGuardar);
       if(!concubinoGuardado){
        try{
          concubinoAEliminar ? this.dataService.concubino.delete(concubinoAEliminar) : null;
        }catch(error){
          this.logger.error("No se pudo eliminar el registro de concubino:",concubinoAEliminar);
        }
       }
       return{
          success:true,
          id:registroFamiliarGuardado.id
        }
    }catch(error){
      this.logger.error(`Error durante la actualizacion de datos familiares:${error}`);
      throw new HttpException(`Error durante la actualizacion de Datos Familiares:${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_datos_judiciales(registroDatosJudiciales:RegistroDatosJudicialesDTO, oficio_judicial:Array<Express.Multer.File>, resolucion:Array<Express.Multer.File>):Promise<RespuestaRegistroJudicialDTO>{
    try{
      
      const respuestaDatosJudiciales = await this.registro_datosJudiciales_factory.generar_datos_judiciales(registroDatosJudiciales,oficio_judicial,resolucion);
      //console.log("Respuesta del Factory:",respuestaDatosJudiciales);
      const oficioJudicialGuardado = await this.dataService.documentoOrdenPrision.create(respuestaDatosJudiciales.oficioJudicialAGuardar);
      const resolucionMjAGuardada = await this.dataService.documentoOrdenPrision.create(respuestaDatosJudiciales.resolucionMJAGuardar);
      console.log("Documentos guardados:",oficioJudicialGuardado,"Resolucion guardada:", resolucionMjAGuardada);
      const situacionJudicialAGuardar = respuestaDatosJudiciales.situacionJudicial;
      
      const situacionJudicialGuardada = await this.dataService.situacionJudicial.create(situacionJudicialAGuardar);
      console.log("Situación judicial guardada:",situacionJudicialGuardada);
      
      console.log("Situacion Judicial:",situacionJudicialGuardada);
      
      
       let ingresoAPrisionAGuardar = respuestaDatosJudiciales.ingresoAPrision;
       ingresoAPrisionAGuardar.documentos_que_ordenan_prision = [oficioJudicialGuardado,resolucionMjAGuardada];
       ingresoAPrisionAGuardar.situacionJudicial = situacionJudicialGuardada;
       ingresoAPrisionAGuardar.establecimiento_penitenciario = respuestaDatosJudiciales.establecimiento;
       const ingresoAPrisionGuardado = await this.dataService.ingresoAPrision.create(ingresoAPrisionAGuardar);
      
       const personAActualizar = respuestaDatosJudiciales.persona;
       personAActualizar.situacionJudicial = situacionJudicialGuardada;
       const personaActualizada = this.dataService.persona.update(personAActualizar);

       

      

      return{
        id: situacionJudicialGuardada.id,
        success:true
      }

    }catch(error){
      this.logger.error(`Error durante en la creación de Datos Judiciales:${error}`);
      throw new HttpException(`Error durante la creación de datos judiciales:${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }

  async actualizar_datos_judiciales(id:number, actualizacionDatosJudicialesDTO:RegistroDatosJudicialesDTO, oficio_judicial:Array<Express.Multer.File>, resolucion:Array<Express.Multer.File>){
    try{
      const respuestaDelFactoryActualizarDatosJudiciales = await this.registro_datosJudiciales_factory.generar_datos_judiciales_para_actualizar(id, actualizacionDatosJudicialesDTO,oficio_judicial[0],resolucion[0]);
      
      const oficioJudicialGuardado = await this.dataService.documentoOrdenPrision.update(respuestaDelFactoryActualizarDatosJudiciales.oficioJudicialAGuardar);
      const resolucionMjAGuardada = await this.dataService.documentoOrdenPrision.update(respuestaDelFactoryActualizarDatosJudiciales.resolucionMJAGuardar);
      
      const situacionJudicialAGuardar = respuestaDelFactoryActualizarDatosJudiciales.situacionJudicial;
      
      const situacionJudicialGuardada = await this.dataService.situacionJudicial.update(situacionJudicialAGuardar);
      
      
      
      
       let ingresoAPrisionAGuardar = respuestaDelFactoryActualizarDatosJudiciales.ingresoAPrision;
       ingresoAPrisionAGuardar.documentos_que_ordenan_prision = [oficioJudicialGuardado,resolucionMjAGuardada];
       ingresoAPrisionAGuardar.situacionJudicial = situacionJudicialGuardada;
       const ingresoAPrisionGuardado = await this.dataService.ingresoAPrision.update(ingresoAPrisionAGuardar);
      
       const personAActualizar = respuestaDelFactoryActualizarDatosJudiciales.persona;
       personAActualizar.situacionJudicial = situacionJudicialGuardada;
       const personaActualizada = this.dataService.persona.update(personAActualizar);
      

      return{
        id: situacionJudicialGuardada.id,
        success:true
      }
      
      

    }catch(error){
      this.logger.error(`Ocurrio un error durante la actualizacion de Datos Judiciales:${error}`);
      throw new HttpException(`Ocurrio un error durante la actualizacion de Datos Judiciales:${error}`,error);
    }
  }


  async grupos_sanguineos():Promise<Array<GrupoSanguineo>>{
    try{
      return await this.dataService.grupo_sanguineo.getAll();
    }catch(error){
      this.logger.error(`Error durante el registro de Datos Judiciales:${error}`);
      throw new HttpException(`Error al consultar los grupos sanguineos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registrar_datos_seguridad(registroDatosSeguridad:RegistroDatosSeguridadDTO):Promise<RespuestaRegistroDatosSeguridadDTO>{
    try{
      const datosDeSeguridadAGuardar = await this.registro_datosSeguridad_factory.generar_datos_seguridad(registroDatosSeguridad);
      const respuestaRegistroDeDatosDeSeguridad = await this.dataService.seguridad.create(datosDeSeguridadAGuardar);
      return{
        success:true,
        id:respuestaRegistroDeDatosDeSeguridad.id
      }
    }catch(error){
      this.logger.error(`Error durante el registro de Datos de Seguridad:${error}`);
      throw new HttpException(`Error al consultar los Datos de Seeguridad`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async actualizar_datos_seguridad(id:number, datosSeguridadDTO:RegistroDatosSeguridadDTO):Promise<RespuestaRegistroDatosDTO>{
    const datosDeSeguridadAActualizar = await this.registro_datosSeguridad_factory.generar_actualizacion_datos_de_seguridad(id,datosSeguridadDTO);
    console.log("Antes de actualizar:", datosDeSeguridadAActualizar.registroDeSeguridadAActualizar)
    try{
      const respuestaActualizarRegistroSeguridad = await this.dataService.seguridad.update(datosDeSeguridadAActualizar.registroDeSeguridadAActualizar);
      return{
        success:true,
        id:respuestaActualizarRegistroSeguridad.id
      }
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

  async obtener_departamentos():Promise<Array<Departamento>>{
    return await this.dataService.departamento.getAll();
  }
}