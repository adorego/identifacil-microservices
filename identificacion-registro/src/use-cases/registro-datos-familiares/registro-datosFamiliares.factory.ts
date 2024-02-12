import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { Familiar } from "src/core/entities/familiar.entity";
import { FamiliarDTO } from "src/core/dto/registro_familiar/familiar.dto";
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

     let datosFamiliares = new DatosFamiliares();
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
     
     return{
      datosFamiliares:datosFamiliares,
      persona:personaEncontrada,
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

     return{
      datosFamiliares:datosFamiliares,
      persona:personaEncontrada,
     }
  }
}