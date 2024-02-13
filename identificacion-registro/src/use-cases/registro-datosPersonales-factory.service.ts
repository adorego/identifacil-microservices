import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro/registro-datos-personales.dto";

@Injectable()
export class RegistroDatosPersonalesFactory{
  private readonly logger = new Logger('RegistroDatosPersonalesFactory');
  constructor(private dataService:IDataService){

  }

  async registrarDatosPersonales(datosPersonalesDTO:RegistroDatosPersonalesDTO):Promise<DatosPersonales> {
     //Validacion de que existe la persona
    //  this.logger.log("Identificacion:"+datosPersonalesDTO.numeroDeIdentificacion);
     if(!datosPersonalesDTO.id_persona){
      throw new HttpException('No se envió el id de persona', HttpStatus.BAD_REQUEST);
     }
     const PersonaEncontrada = await this.dataService.persona.get(datosPersonalesDTO.id_persona);
     if(!PersonaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     if(!datosPersonalesDTO.estadoCivil){
      throw new HttpException('Se debe enviar un estado civil', HttpStatus.BAD_REQUEST);
     }
     const EstadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
     if(!EstadoCivil){
      throw new HttpException('No existe este estado civil', HttpStatus.NOT_FOUND)
     }

     const Nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!Nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

     
     let datosPersonales = new DatosPersonales();
     
     
     return datosPersonales = {
      ...datosPersonalesDTO,
      nacionalidad:Nacionalidad,
      estado_civil:EstadoCivil,
      persona:PersonaEncontrada
    }
  
  }

  async generarDatosPersonalesAActualizar(id:number, datosPersonalesDTO:RegistroDatosPersonalesDTO){
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

    //  id_persona:number|null;
    //   numeroDeIdentificacion:string;
    //   nombre: string;
    //   nombre_modificado:boolean;
    //   apellido: string;
    //   apellido_modificado:boolean;
    //   apodo: string;
    //   apodo_modificado:boolean;
    //   estadoCivil: number;
    //   estadoCivil_modificado:boolean;
    //   fechaDeNacimiento: Date;
    //   fechaDeNacimiento_modificado:boolean;
    //   nacionalidad: number;
    //   nacionalidad_modificado:boolean;
    //   lugarDeNacimiento: string;
    //   lugarDeNacimiento_modificado:boolean;
    //   sexo: string;
    //   sexo_modificado:boolean;
    //   tipoDeDocumento: string;
    //   tipoDeDocumento_modificado:boolean;
    //   direccion: string;
    //   direccion_modificado:boolean;
    //   barrioCompania: string;
    //   barrioCompania_modificado:boolean;
    //   numeroDeContacto: string;
    //   numeroDeContacto_modificado:boolean;
    //   contactoDeEmergencia1: string;
    //   contactoDeEmergencia1_modificado:boolean;
    //   contactoDeEmergencia2: string;
    //   contactoDeEmergencia2_modificado:boolean;
    //   pueblosIndigenas: boolean;
    //   pueblosIndigenas_modificado:boolean;
    //   nombreEtnia: string;
    //   nombreEtnia_modificado:boolean;
    //   perteneceAComunidadLGTBI:boolean;
    //   perteneceAComunidadLGTBI_modificado:boolean;
    //   grupoLgbti: string;
    //   grupoLgbti_modificado:boolean;

     const datosPersonalesGuardados = await this.dataService.datosPersonales.update(datosPersonales);
     return{
        datosPersonales:datosPersonalesGuardados
     }

  }
}