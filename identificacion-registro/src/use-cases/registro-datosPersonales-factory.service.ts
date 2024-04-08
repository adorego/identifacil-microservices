import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";
import { RespuestaDatosPersonalesDTO } from "src/core/dto/registro_datos_personales/respuesta-factory-registro-datos-personales.dto";
import { RespuestaFactoryActualizarDatosPersonales } from "src/core/dto/registro_datos_personales/respuesta-factory-actualizar-datos-personales.dto";
import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";

@Injectable()
export class RegistroDatosPersonalesFactory{
  private readonly logger = new Logger('RegistroDatosPersonalesFactory');
  constructor(private dataService:IDataService){

  }

  async registrarDatosPersonales(datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<RespuestaDatosPersonalesDTO> {
     //Validacion de que existe la persona
    //  this.logger.log("Identificacion:"+datosPersonalesDTO.numeroDeIdentificacion);
    console.log("Datos que llegan a registrarDatosPersonales:",datosPersonalesDTO);
     if(!datosPersonalesDTO.id_persona){
      throw new HttpException('No se envió el id de persona', HttpStatus.BAD_REQUEST);
     }
     const personaEncontrada = await this.dataService.persona.get(datosPersonalesDTO.id_persona);
     if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     
     let estadoCivil=null;
     if(datosPersonalesDTO.estadoCivil){
        estadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
        if(!estadoCivil){
          throw new HttpException('No existe este estado civil enviado', HttpStatus.NOT_FOUND)
        }
     }
     

     const nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

    let departamento=null;
    if(datosPersonalesDTO.departamento){
      departamento = await this.dataService.departamento.get(datosPersonalesDTO.departamento);
    }

    let ciudad=null;
    if(datosPersonalesDTO.ciudad){
      ciudad = await this.dataService.ciudad.get(datosPersonalesDTO.ciudad);
    }

     
     const datosPersonales = new DatosPersonales();
     datosPersonales.apodo =   datosPersonalesDTO.apodo;
     
     datosPersonales.estadoCivil = estadoCivil;
     
     datosPersonales.nacionalidad = nacionalidad;
    
     datosPersonales.lugarDeNacimiento = datosPersonalesDTO.lugarDeNacimiento;
    
     datosPersonales.direccion = datosPersonalesDTO.direccion;
     datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
     datosPersonales.barrioCompania = datosPersonalesDTO.barrioCompania;
    
     datosPersonales.ciudad = ciudad;
     datosPersonales.departamento = departamento;
    
     datosPersonales.numeroDeContacto = datosPersonalesDTO.numeroDeContacto;
     
     
    
    datosPersonales.contactoDeEmergencia1 = datosPersonalesDTO.contactoDeEmergencia1;
    
    datosPersonales.contactoDeEmergencia2 = datosPersonalesDTO.contactoDeEmergencia2;
     
     datosPersonales.pueblosIndigenas = datosPersonalesDTO.pueblosIndigenas;
    
     datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
     
     datosPersonales.perteneceAComunidadLGTBI = datosPersonalesDTO.perteneceAComunidadLGTBI;
    
     datosPersonales.persona = personaEncontrada

     let contactoEnEmbajada = null;
     if(personaEncontrada.es_extranjero){
        if(datosPersonalesDTO.tiene_contacto_en_embajada){
          contactoEnEmbajada = new ContactoEnEmbajada();
          contactoEnEmbajada.nombre = datosPersonalesDTO.nombre_contacto_en_embajada;
          contactoEnEmbajada.numero = datosPersonalesDTO.telefono_contacto_en_embajada;
          const pais_de_embajada = await this.dataService.pais.get(datosPersonalesDTO.pais_embajada);
          if(!pais_de_embajada){
          throw new HttpException(`No se encuentra el pais de embajada`,HttpStatus.BAD_REQUEST);
          }
          contactoEnEmbajada.pais = pais_de_embajada;
          personaEncontrada.tiene_contacto_en_embajada = datosPersonalesDTO.tiene_contacto_en_embajada;
        }
        
     }
    
    
     //Actualizar datos de persona
    
     
     
     return{
      datosPersonales:datosPersonales,
      nacionalidad:nacionalidad,
      estado_civil:estadoCivil,
      persona:personaEncontrada,
      contactoEnEmbajada:contactoEnEmbajada
     }
  
  }

  async generarDatosPersonalesAActualizar(id:number, datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<RespuestaFactoryActualizarDatosPersonales>{
    
    console.log("Entró en generarDatosPersonalesAActualizar");
    //Validar que exista el Objeto
    if(!id){
      throw new HttpException('El identificador del registro debe ser valido', HttpStatus.BAD_REQUEST);
    }
    let datosPersonales = await this.dataService.datosPersonales.get(id);
    if(!datosPersonales){
      throw new HttpException('No se encontro el registro de Datos Personales', HttpStatus.BAD_REQUEST);
    }
    if(!datosPersonalesDTO.id_persona){
      throw new HttpException('No se envió el id de persona', HttpStatus.BAD_REQUEST);
     }
     const personaEncontrada = await this.dataService.persona.get(datosPersonalesDTO.id_persona);
    if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 

    let estadoCivil=null;
    if(datosPersonalesDTO.estadoCivil){
        estadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
        if(!estadoCivil){
          throw new HttpException('No existe este estado civil enviado', HttpStatus.NOT_FOUND)
        }
     }

     if(!datosPersonalesDTO.nacionalidad){
      throw new HttpException('Se debe enviar una nacionalidad valida', HttpStatus.BAD_REQUEST);
     }
     const nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

     let departamento=null;
    if(datosPersonalesDTO.departamento){
      departamento = await this.dataService.departamento.get(datosPersonalesDTO.departamento);
    }
    console.log("Departamento:",departamento);

    let ciudad=null;
    if(datosPersonalesDTO.ciudad){
      ciudad = await this.dataService.ciudad.get(datosPersonalesDTO.ciudad);
    }
    console.log("Ciudad:",ciudad);


    //  id_persona:number|null;
    //   numeroDeIdentificacion:string;
          datosPersonales.id = datosPersonales.id;
          datosPersonales.apodo = datosPersonalesDTO.apodo;
          
          datosPersonales.estadoCivil = estadoCivil;
         
          datosPersonales.nacionalidad = nacionalidad;
          
          datosPersonales.lugarDeNacimiento = datosPersonalesDTO.lugarDeNacimiento;
         
          datosPersonales.direccion = datosPersonalesDTO.direccion;
          
          datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
         
          datosPersonales.barrioCompania = datosPersonalesDTO.barrioCompania;
          
          datosPersonales.ciudad = ciudad;
          datosPersonales.departamento = departamento;
          
          datosPersonales.numeroDeContacto= datosPersonalesDTO.numeroDeContacto;
         
          datosPersonales.contactoDeEmergencia1 = datosPersonalesDTO.contactoDeEmergencia1;
         
          datosPersonales.contactoDeEmergencia2 = datosPersonalesDTO.contactoDeEmergencia2;
          
          datosPersonales.pueblosIndigenas = datosPersonalesDTO.pueblosIndigenas;
         
          datosPersonales.nombreEtnia = datosPersonalesDTO.nombreEtnia;
          
          datosPersonales.perteneceAComunidadLGTBI = datosPersonalesDTO.perteneceAComunidadLGTBI;
         
          
          datosPersonales.persona = datosPersonales.persona;

          
          let contactoEnEmbajada =  personaEncontrada.contactoDeEmbajadaoConsulado;
          //console.log("Contacto de embajada:",contactoEnEmbajada);
          if(!contactoEnEmbajada){
            contactoEnEmbajada = new ContactoEnEmbajada();
          }
          contactoEnEmbajada.nombre = datosPersonalesDTO.nombre_contacto_en_embajada;
          contactoEnEmbajada.numero = datosPersonalesDTO.telefono_contacto_en_embajada;
          const pais_de_embajada = await this.dataService.pais.get(datosPersonalesDTO.pais_embajada);
          if(!pais_de_embajada){
            throw new HttpException(`No se encuentra el pais de embajada`,HttpStatus.BAD_REQUEST);
          }
          contactoEnEmbajada.pais = pais_de_embajada;
          personaEncontrada.tiene_contacto_en_embajada = datosPersonalesDTO.tiene_contacto_en_embajada;
         

          
     return{
        datosPersonales:datosPersonales,
        nacionalidad:nacionalidad,
        estado_civil:estadoCivil,
        contactoEnEmbajada:contactoEnEmbajada,
        persona:personaEncontrada
        
     }

  }

  
}