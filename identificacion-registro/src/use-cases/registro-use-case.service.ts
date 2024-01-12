import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegistroSaludFactory, RespuestaRegistroSaludfactory } from "./registro-salud-factory.service";

import { GrupoSanguineo } from "src/core/entities/grupo-sanguineo.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroSaludDTO } from "src/core/dto/registro-salud.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/respuesta-registro-salud.dto";
import { Salud } from "src/core/entities/salud.entity";
import { Vacuna } from "src/core/entities/vacuna.entity";

@Injectable()
export class RegistroUseCase{

  constructor(
    private dataService:IDataService,
    private registro_salud_factory:RegistroSaludFactory
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
        throw new HttpException(`Error durante el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
     }

     

  }

  async registrar_salud(registroSaludDTO:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    
    const registro_salud:RespuestaRegistroSaludfactory = await this.registro_salud_factory.crearRegistroSalud(registroSaludDTO);
    
    try{
      const persona = registro_salud.persona;
      const updatedSalud = await this.dataService.salud.create(registro_salud.registro_salud);
      console.log('Se actualizo Salud:', updatedSalud); 
      persona.salud = updatedSalud;
      const updatedSaludMental = await this.dataService.saludMental.create(registro_salud.registro_salud_mental);
      persona.salud_mental = updatedSaludMental;
      const updatedSaludFisica = await this.dataService.saludFisica.create(registro_salud.registro_salud_fisica);
      persona.salud_fisica = updatedSaludFisica;
      const updatedLimitacionesIdiomaticas = await this.dataService.limitacionesIdiomaticas.create(registro_salud.registro_limitacionesIdiomaticas);
      persona.limitacion_idiomatica = updatedLimitacionesIdiomaticas;
      
      const updatedPersona:Persona  = await this.dataService.persona.update(persona);
      console.log('Guardo la referencia a la persona', updatedPersona);
      return {
        success:true
      }
        
    }catch(error){
      throw new HttpException(`Error durante el registro de salud`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async grupos_sanguineos():Promise<Array<GrupoSanguineo>>{
    try{
      return await this.dataService.grupo_sanguineo.getAll();
    }catch(error){
      throw new HttpException(`Error al consultar los grupos sanguineos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async vacunas():Promise<Array<Vacuna>>{
    try{
      return await this.dataService.vacuna.getAll()
    }catch(error){
      throw new HttpException(`Error al consultar las vacunas`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async nacionalidades():Promise<Array<Nacionalidad>>{
    try{
      return await this.dataService.nacionalidad.getAll()
    }catch(error){
      throw new HttpException('Error al consultar las nacionaliidades', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}