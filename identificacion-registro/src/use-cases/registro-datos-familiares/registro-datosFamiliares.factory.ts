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
     const queryRunner = this.dataService.getQueryRunner();
     let datosFamiliaresGuardados:DatosFamiliares = null;
     try{
      queryRunner.startTransaction();
      let familiaresGuardados:Array<Familiar> = null; 
      if(datosFamiliaresDTO.familiares_modificado){
          familiaresGuardados = await Promise.all(datosFamiliaresDTO.familiares.map(
            async (familiar) =>{
              const crearFamiliar = async (familiar:FamiliarDTO) =>{
                const vinculo = await this.dataService.vinculo_familiar.get(familiar.vinculo);
                const establecimiento = await this.dataService.establecimientoPenitenciario.get(familiar.establecimiento);
                const familiarACrear = new Familiar();
                familiarACrear.nombre = familiar.nombre;
                familiarACrear.apellido = familiar.apellido;
                familiarACrear.vinculo = vinculo;
                familiarACrear.establecimiento = establecimiento;
                
                
                return await queryRunner.manager.save(FamiliarModel, familiarACrear);
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
      let concubinoGuardado:Concubino = null;
      if(datosFamiliaresDTO.concubino_modificado){
        if(datosFamiliaresDTO.concubino){
          const concubino = new Concubino();
          concubino.nombres = datosFamiliaresDTO.concubino.nombres;
          concubino.apellidos = datosFamiliaresDTO.concubino.apellidos;
          concubino.numeroDeIdentificacion = datosFamiliaresDTO.concubino.numeroDeIdentificacion;
          concubinoGuardado = queryRunner.manager.save(ConcubinoModel, concubino);
        }
      }

      let datosFamiliares = new DatosFamiliares();
      datosFamiliares.tieneCirculoFamiliar = datosFamiliaresDTO.tieneCirculoFamiliar;
      datosFamiliares.tieneCirculoFamiliar_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
      datosFamiliares.esCabezaDeFamilia = datosFamiliaresDTO.esCabezaDeFamilia;
      datosFamiliares.esCabezaDeFamilia_modificado = datosFamiliaresDTO.esCabezaDeFamilia_modificado;
      datosFamiliares.tieneConcubino = datosFamiliaresDTO.tieneConcubino;
      datosFamiliares.tieneConcubino_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
      datosFamiliares.familiares = familiaresGuardados;
      datosFamiliares.familiares_modificado = datosFamiliaresDTO.familiares_modificado;
      datosFamiliares.concubino = concubinoGuardado;
      datosFamiliares.concubino_modificado = datosFamiliaresDTO.concubino_modificado;
      datosFamiliaresGuardados = queryRunner.manager.save(DatosFamiliaresModel, datosFamiliares);
      queryRunner.commitTransaction();
    }catch(error){
      queryRunner.rollbackTransaction();
      this.logger.error(`Error al guardar el registro famiiliar:${error}`);
    }finally{
      queryRunner.release()
    }
     
     return {
      datosFamiliares:datosFamiliaresGuardados
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
    const personaEncontrada = await this.dataService.persona.get(datosFamiliaresDTO.id_persona);
     if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 
     let familiares:Array<Familiar> = null; 
     if(datosFamiliaresDTO.familiares_modificado){
        familiares = await Promise.all(datosFamiliaresDTO.familiares.map(
          async (familiar) =>{
            const crearFamiliar = async (familiar:FamiliarDTO) =>{
              const familiarACrear = new Familiar();
              familiarACrear.nombre = familiar.nombre;
              familiarACrear.apellido = familiar.apellido;
              familiarACrear.vinculo = await this.dataService.vinculo_familiar.get(familiar.vinculo);
              familiarACrear.establecimiento = await this.dataService.establecimientoPenitenciario.get(familiar.establecimiento);
              return familiarACrear;
            }
            return await crearFamiliar(familiar);
          }
        ))
     }
     let concubinoAAgregar:Concubino = null;
     if(datosFamiliaresDTO.concubino_modificado){
      if(datosFamiliaresDTO.concubino){
        const concubino = new Concubino();
        concubino.nombres = datosFamiliaresDTO.concubino.nombres;
        concubino.apellidos = datosFamiliaresDTO.concubino.apellidos;
        concubino.numeroDeIdentificacion = datosFamiliaresDTO.concubino.numeroDeIdentificacion;
        concubinoAAgregar = concubino;
      }
     }
     datosFamiliares.tieneCirculoFamiliar = datosFamiliaresDTO.tieneCirculoFamiliar;
     datosFamiliares.tieneCirculoFamiliar_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
     datosFamiliares.esCabezaDeFamilia = datosFamiliaresDTO.esCabezaDeFamilia;
     datosFamiliares.esCabezaDeFamilia_modificado = datosFamiliaresDTO.esCabezaDeFamilia_modificado;
     datosFamiliares.tieneConcubino = datosFamiliaresDTO.tieneConcubino;
     datosFamiliares.tieneConcubino_modificado = datosFamiliaresDTO.tieneCirculoFamiliar_modificado;
     datosFamiliares.familiares = familiares;
     datosFamiliares.familiares_modificado = datosFamiliaresDTO.familiares_modificado;
     datosFamiliares.concubino = concubinoAAgregar;
     datosFamiliares.concubino_modificado = datosFamiliaresDTO.concubino_modificado;

     console.log("datos familiares generados:", datosFamiliares);
     return{
      datosFamiliares:datosFamiliares,
      
     }
  }
}