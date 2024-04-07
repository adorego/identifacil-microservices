import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";
import { RespuestaDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-factory-registro-datos-personales.dto";
import { RespuestaFactoryActualizarDatosPersonales } from "src/core/dto/registro_datos_personales/respuesta-factory-actualizar-datos-personales.dto";
import { RespuestaRegistroDatosPersonalesDTO } from "src/core/dto/registro/respuesta-registro-datos-personales.dto";
import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";

@Injectable()
export class RegistroDatosPersonalesFactory{
  private readonly logger = new Logger('RegistroDatosPersonalesFactory');
  constructor(private dataService:IDataService){

  }

  async registrarDatosPersonales(datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<RespuestaDatosPersonalesDTO> {
     //Validacion de que existe la persona
    //  this.logger.log("Identificacion:"+datosPersonalesDTO.numeroDeIdentificacion);
     if(!datosPersonalesDTO.id_persona){
      throw new HttpException('No se envió el id de persona', HttpStatus.BAD_REQUEST);
     }
     const personaEncontrada = await this.dataService.persona.get(datosPersonalesDTO.id_persona);
     if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     if(!datosPersonalesDTO.estadoCivil){
      throw new HttpException('Se debe enviar un estado civil', HttpStatus.BAD_REQUEST);
     }
     const estadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
     if(!estadoCivil){
      throw new HttpException('No existe este estado civil', HttpStatus.NOT_FOUND)
     }

     const nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

     
     let datosPersonales = new DatosPersonales();
     datosPersonales.apodo =   datosPersonalesDTO.apodo;
     datosPersonales.apodo_modificado = datosPersonalesDTO.apodo_modificado;
     datosPersonales.estadoCivil = estadoCivil;
     datosPersonales.estadoCivil_modificado = datosPersonalesDTO.estadoCivil_modificado;
     datosPersonales.nacionalidad = nacionalidad;
     datosPersonales.nacionalidad_modificado = datosPersonalesDTO.nacionalidad_modificado;
     datosPersonales.lugarDeNacimiento = datosPersonalesDTO.lugarDeNacimiento;
     datosPersonales.lugarDeNacimiento_modificado = datosPersonalesDTO.lugarDeNacimiento_modificado;
     datosPersonales.direccion = datosPersonalesDTO.direccion;
     datosPersonales.direccion_modificado = datosPersonalesDTO.direccion_modificado;
     datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
     datosPersonales.nombreEtnia_modificado = datosPersonalesDTO.nombreEtnia_modificado;
     datosPersonales.barrioCompania = datosPersonalesDTO.barrioCompania;
     datosPersonales.barrioCompania_modificado = datosPersonalesDTO.barrioCompania_modificado;
     datosPersonales.numeroDeContacto= datosPersonalesDTO.numeroDeContacto;
     datosPersonales.numeroDeContacto_modificado = datosPersonalesDTO.numeroDeContacto_modificado;
     datosPersonales.contactoDeEmergencia1 = datosPersonalesDTO.contactoDeEmergencia1;
     datosPersonales.contactoDeEmergencia1_modificado = datosPersonalesDTO.contactoDeEmergencia1_modificado;
     datosPersonales.contactoDeEmergencia2 = datosPersonalesDTO.contactoDeEmergencia2;
     datosPersonales.contactoDeEmergencia2_modificado = datosPersonalesDTO.contactoDeEmergencia2_modificado;
     datosPersonales.pueblosIndigenas = datosPersonalesDTO.pueblosIndigenas;
     datosPersonales.pueblosIndigenas_modificado = datosPersonalesDTO.pueblosIndigenas_modificado;
     datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
     datosPersonales.nombreEtnia_modificado = datosPersonalesDTO.nombreEtnia_modificado;
     datosPersonales.perteneceAComunidadLGTBI = datosPersonalesDTO.perteneceAComunidadLGTBI;
     datosPersonales.perteneceAComunidadLGTBI_modificado = datosPersonalesDTO.perteneceAComunidadLGTBI_modificado;
     datosPersonales.persona = personaEncontrada

     const contactoEnEmbajada = new ContactoEnEmbajada();
     contactoEnEmbajada.nombre = datosPersonalesDTO.nombre_contacto_en_embajada;
     contactoEnEmbajada.numero = datosPersonalesDTO.telefono_contacto_en_embajada;
     const pais_de_embajada = await this.dataService.pais.get(datosPersonalesDTO.pais_embajada);
     if(!pais_de_embajada){
      throw new HttpException(`No se encuentra el pais de embajada`,HttpStatus.BAD_REQUEST);
     }
     contactoEnEmbajada.pais = pais_de_embajada;
     personaEncontrada.tiene_contacto_en_embajada = datosPersonalesDTO.tiene_contacto_en_embajada;
     personaEncontrada.es_extranjero = datosPersonalesDTO.es_extranjero;

     
     
     return{
      datosPersonales:datosPersonales,
      nacionalidad:nacionalidad,
      estado_civil:estadoCivil,
      persona:personaEncontrada,
      contactoEnEmbajada:contactoEnEmbajada
     }
  
  }

  async generarDatosPersonalesAActualizar(id:number, datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<RespuestaFactoryActualizarDatosPersonales>{
    //Validar que exista el Objeto
    if(!id){
      throw new HttpException('El identificador del registro debe ser valido', HttpStatus.BAD_REQUEST);
    }
    let datosPersonales = await this.dataService.datosPersonales.get(id);
    if(!datosPersonales){
      throw new HttpException('No se encontro el registro de Datos Personales', HttpStatus.BAD_REQUEST);
    }
    if(!datosPersonalesDTO.estadoCivil){
      throw new HttpException('Se debe enviar un estado civil', HttpStatus.BAD_REQUEST);
     }
     const estadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
     if(!estadoCivil){
      throw new HttpException('No existe este estado civil', HttpStatus.NOT_FOUND)
     }

     if(!datosPersonalesDTO.nacionalidad){
      throw new HttpException('Se debe enviar una nacionalidad valida', HttpStatus.BAD_REQUEST);
     }
     const nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

     if(datosPersonalesDTO.id_persona){
      throw new HttpException('Se debe enviar el id de Persona', HttpStatus.BAD_REQUEST);
     }

     const personaEncontrada = await this.dataService.persona.get(datosPersonalesDTO.id_persona);
     if(!personaEncontrada){
      throw new HttpException('No existe la persona enviada', HttpStatus.NOT_FOUND);
     }

    //  id_persona:number|null;
    //   numeroDeIdentificacion:string;
          datosPersonales.id = datosPersonales.id;
          datosPersonales.apodo = datosPersonalesDTO.apodo;
          datosPersonales.apodo_modificado = datosPersonalesDTO.apodo_modificado;
          datosPersonales.estadoCivil = estadoCivil;
          datosPersonales.estadoCivil_modificado = datosPersonalesDTO.estadoCivil_modificado;
          datosPersonales.nacionalidad = nacionalidad;
          datosPersonales.nacionalidad_modificado = datosPersonalesDTO.nacionalidad_modificado
          datosPersonales.lugarDeNacimiento = datosPersonalesDTO.lugarDeNacimiento;
          datosPersonales.lugarDeNacimiento_modificado = datosPersonalesDTO.lugarDeNacimiento_modificado;
          datosPersonales.direccion = datosPersonalesDTO.direccion;
          datosPersonales.direccion_modificado = datosPersonalesDTO.direccion_modificado;
          datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
          datosPersonales.nombreEtnia_modificado = datosPersonalesDTO.nombreEtnia_modificado;
          datosPersonales.barrioCompania = datosPersonalesDTO.barrioCompania;
          datosPersonales.barrioCompania_modificado = datosPersonalesDTO.barrioCompania_modificado;
          datosPersonales.numeroDeContacto= datosPersonalesDTO.numeroDeContacto;
          datosPersonales.numeroDeContacto_modificado = datosPersonalesDTO.numeroDeContacto_modificado;
          datosPersonales.contactoDeEmergencia1 = datosPersonalesDTO.contactoDeEmergencia1;
          datosPersonales.contactoDeEmergencia1_modificado = datosPersonalesDTO.contactoDeEmergencia1_modificado;
          datosPersonales.contactoDeEmergencia2 = datosPersonalesDTO.contactoDeEmergencia2;
          datosPersonales.contactoDeEmergencia2_modificado = datosPersonalesDTO.contactoDeEmergencia2_modificado;
          datosPersonales.pueblosIndigenas = datosPersonalesDTO.pueblosIndigenas;
          datosPersonales.pueblosIndigenas_modificado = datosPersonalesDTO.pueblosIndigenas_modificado;
          datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
          datosPersonales.nombreEtnia_modificado = datosPersonalesDTO.nombreEtnia_modificado;
          datosPersonales.perteneceAComunidadLGTBI = datosPersonalesDTO.perteneceAComunidadLGTBI;
          datosPersonales.perteneceAComunidadLGTBI_modificado = datosPersonalesDTO.perteneceAComunidadLGTBI_modificado;
          
          datosPersonales.persona = datosPersonales.persona;

          const contactoEnEmbajada =  personaEncontrada.contactoDeEmbajadaoConsulado;
          contactoEnEmbajada.nombre = datosPersonalesDTO.nombre_contacto_en_embajada;
          contactoEnEmbajada.numero = datosPersonalesDTO.telefono_contacto_en_embajada;
          const pais_de_embajada = await this.dataService.pais.get(datosPersonalesDTO.pais_embajada);
          if(!pais_de_embajada){
            throw new HttpException(`No se encuentra el pais de embajada`,HttpStatus.BAD_REQUEST);
          }
          contactoEnEmbajada.pais = pais_de_embajada;
          personaEncontrada.tiene_contacto_en_embajada = datosPersonalesDTO.tiene_contacto_en_embajada;
          personaEncontrada.es_extranjero = datosPersonalesDTO.es_extranjero;

          
     return{
        datosPersonales:datosPersonales,
        nacionalidad:nacionalidad,
        estado_civil:estadoCivil,
        contactoEnEmbajada:contactoEnEmbajada
        
     }

  }

  
}