import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { Concubino } from "src/core/entities/concubino.entity";
import { ConcubinoModel } from "src/framework/data-service/postgres/models/concubino.model";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosFamiliaresModel } from "src/framework/data-service/postgres/models/datos-familiares.model";
import { Familiar } from "src/core/entities/familiar.entity";
import { FamiliarDTO } from "src/core/dto/registro_familiar/familiar.dto";
import { FamiliarModel } from "src/framework/data-service/postgres/models/familiar.model";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RespuestaGenerarRegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/respuesta-generacion-datos-familiares.dto";

@Injectable()
export class RegistroDatosFamiliaresFactory{
  private readonly logger = new Logger('RegistroDatosFamiliaresFactory');
  constructor(
    private dataService:IDataService
  ){

  }

  async generar_datos_familiares(datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaGenerarRegistroDatosFamiliaresDTO>{
     if(!datosFamiliaresDTO.id_persona){
       throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
     }
     const personaEncontrada = await this.dataService.persona.get(datosFamiliaresDTO.id_persona);
     if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     if(personaEncontrada.datosFamiliares){
      throw new HttpException('Ya existe un registro de datos familiares', HttpStatus.BAD_REQUEST);
     }
     
     let datosFamiliaresGuardados:DatosFamiliares = null;
     try{
      let familiaresACrear:Array<Familiar> = null; 
      if(datosFamiliaresDTO.familiares_modificado && datosFamiliaresDTO.tieneCirculoFamiliar){
        familiaresACrear = await Promise.all(datosFamiliaresDTO.familiares.map(
            async (familiar) =>{
              const crearFamiliar = async (familiar:FamiliarDTO) =>{
                const vinculo = await this.dataService.vinculo_familiar.get(familiar.vinculo);
                const establecimiento = await this.dataService.establecimientoPenitenciario.get(familiar.establecimiento);
                const familiarACrear = new Familiar();
                familiarACrear.nombre = familiar.nombre;
                familiarACrear.apellido = familiar.apellido;
                familiarACrear.vinculo = vinculo;
                familiarACrear.establecimiento = establecimiento;
                familiarACrear.edad = familiar.edad;
                familiarACrear.esFuncionario = familiar.esFuncionario;
                return familiarACrear;
                
                
                
              }
              if(!familiar.establecimiento){
                throw new HttpException(`El Establecimiento del Familiar no puede ser nulo`,HttpStatus.BAD_REQUEST);
              }
              if(!familiar.vinculo){
                throw new HttpException(`El vinculo del Familiar no puede ser nulo`,HttpStatus.BAD_REQUEST);
              }
              return await crearFamiliar(familiar);
            }
          ))
      }
      console.log("Familiares Guardados",familiaresACrear);
      let concubinoACrear:Concubino = null;
      if(datosFamiliaresDTO.concubino_modificado && datosFamiliaresDTO.tieneConcubino){
        if(datosFamiliaresDTO.concubino){
          concubinoACrear = new Concubino();
          concubinoACrear.nombres = datosFamiliaresDTO.concubino.nombres;
          concubinoACrear.apellidos = datosFamiliaresDTO.concubino.apellidos;
          concubinoACrear.numeroDeIdentificacion = datosFamiliaresDTO.concubino.numeroDeIdentificacion;
          
        }
      }

      let datosFamiliares = new DatosFamiliares();
      datosFamiliares.tieneCirculoFamiliar = datosFamiliaresDTO.tieneCirculoFamiliar;
      datosFamiliares.tieneCirculoFamiliar_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
      datosFamiliares.esCabezaDeFamilia = datosFamiliaresDTO.esCabezaDeFamilia;
      datosFamiliares.esCabezaDeFamilia_modificado = datosFamiliaresDTO.esCabezaDeFamilia_modificado;
      datosFamiliares.tieneConcubino = datosFamiliaresDTO.tieneConcubino;
      datosFamiliares.tieneConcubino_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
      datosFamiliares.familiares_modificado = datosFamiliaresDTO.familiares_modificado;
      datosFamiliares.concubino_modificado = datosFamiliaresDTO.concubino_modificado;
      return {
        datosFamiliares:datosFamiliares,
        concubino:concubinoACrear,
        familiares:familiaresACrear,
        persona:personaEncontrada
      }
    }catch(error){
      
      this.logger.error(`Error al guardar el registro famiiliar:${error}`);
    }
     
     
      
     
     
  }

  async actualizar_datos_familiares(id:number, datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<RespuestaGenerarRegistroDatosFamiliaresDTO>{
    //Validar id
    if(!id){
      throw new HttpException('No se envió el id del registro familiar', HttpStatus.BAD_REQUEST);
    }
    let datosFamiliares = await this.dataService.datosFamiliares.get(id);
    if(!datosFamiliares){
      throw new HttpException('No se encontró el registro famiiliar enviado', HttpStatus.BAD_REQUEST);
    }
    if(!datosFamiliaresDTO.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(datosFamiliaresDTO.id_persona);
    if(!personaEncontrada){
       throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 

    let familiaresACrear:Array<Familiar> = null;
    const familiares = datosFamiliares.familiares;
    
    if(familiares && familiares.length > 0){
      try{
          //Eliminar los familiares actuales si los hay
          
          await Promise.all(familiares.map(
            async (familiar) =>{
              await this.dataService.familiar.delete(familiar);
            }
          ))
      }catch(error){
          this.logger.error(`Hubo un error al eliminar los familiares:${error}`);
          throw new HttpException(`Error al eliminar los datos de familiare:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    if(datosFamiliaresDTO.tieneCirculoFamiliar && datosFamiliaresDTO.familiares && datosFamiliaresDTO.familiares.length >0){
      try{
        familiaresACrear = await Promise.all(datosFamiliaresDTO.familiares.map(
              async (familiar) =>{
              const crearFamiliar = async (familiar:FamiliarDTO) =>{
                const vinculo = await this.dataService.vinculo_familiar.get(familiar.vinculo);
                const establecimiento = await this.dataService.establecimientoPenitenciario.get(familiar.establecimiento);
                const familiarACrear = new Familiar();
                familiarACrear.nombre = familiar.nombre;
                familiarACrear.apellido = familiar.apellido;
                familiarACrear.edad = familiar.edad;
                familiarACrear.vinculo = vinculo;
                familiarACrear.establecimiento = establecimiento;
                familiarACrear.esFuncionario = familiar.esFuncionario;
                return familiarACrear;
                
                
                
              }
              if(!familiar.establecimiento){
                this.logger.error(`El Establecimiento del Familiar no puede ser nulo`);
                throw new HttpException(`El Establecimiento del Familiar no puede ser nulo`,HttpStatus.BAD_REQUEST);
                
              }
              if(!familiar.vinculo){
                this.logger.error(`El vinculo del Familiar no puede ser nulo`);
                throw new HttpException(`El vinculo del Familiar no puede ser nulo`,HttpStatus.BAD_REQUEST);
              }
              return await crearFamiliar(familiar);
            }
          ))
        }catch(error){
          throw new HttpException(`El vinculo del Familiar no puede ser nulo`,HttpStatus.BAD_REQUEST);
              
        }
    }
    
    
    
    try{
        let concubinoACrear = datosFamiliares.concubino;
        if(concubinoACrear){
          concubinoACrear.id = concubinoACrear.id;
          concubinoACrear.nombres = datosFamiliaresDTO.concubino.nombres;
          concubinoACrear.apellidos = datosFamiliaresDTO.concubino.apellidos;
          concubinoACrear.numeroDeIdentificacion = datosFamiliaresDTO.concubino.numeroDeIdentificacion;
          
        }else{
          if(datosFamiliaresDTO.concubino){
            concubinoACrear = new Concubino();
            concubinoACrear.nombres = datosFamiliaresDTO.concubino.nombres;
            concubinoACrear.apellidos = datosFamiliaresDTO.concubino.apellidos;
            concubinoACrear.numeroDeIdentificacion = datosFamiliaresDTO.concubino.numeroDeIdentificacion;
            
          }
        }
        console.log("Concubino a crear:", concubinoACrear);
        datosFamiliares.tieneCirculoFamiliar = datosFamiliaresDTO.tieneCirculoFamiliar;
        datosFamiliares.tieneCirculoFamiliar_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
        datosFamiliares.esCabezaDeFamilia = datosFamiliaresDTO.esCabezaDeFamilia;
        datosFamiliares.esCabezaDeFamilia_modificado = datosFamiliaresDTO.esCabezaDeFamilia_modificado;
        datosFamiliares.tieneConcubino = datosFamiliaresDTO.tieneConcubino;
        datosFamiliares.tieneConcubino_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
        datosFamiliares.familiares_modificado = datosFamiliaresDTO.familiares_modificado;
        datosFamiliares.concubino_modificado = datosFamiliaresDTO.concubino_modificado;
        return {
          datosFamiliares:datosFamiliares,
          concubino:concubinoACrear,
          familiares:familiaresACrear,
          persona:personaEncontrada,
        }

      }catch(error){
      
        this.logger.error(`Error al guardar el registro familiar:${error}`);
      }
  }
}