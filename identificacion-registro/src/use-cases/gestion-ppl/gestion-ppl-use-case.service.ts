import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable } from "@nestjs/common";
import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";

@Injectable()
export class GestionPPLUseCase{
  constructor(
    private dataService:IDataService,
  ){}

  async getAllPpls():Promise<Array<PplDTO>>{
    const ppls:Array<Ppl> = await this.dataService.ppl.getAll();
    const pplsDTOs:Array<PplDTO> = ppls.map(
      (ppl) =>{
          return{
            nombre:ppl.persona.nombre,
            apellido:ppl.persona.apellido,
            apodo:ppl.persona.datosPersonales?.apodo,
            genero:ppl.persona.genero.id,
            fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
            estado_perfil:this.verificar_perfil(ppl.persona),
            datosPersonales:ppl.persona.datosPersonales,
            datosDeSalud:ppl.persona.salud,
            datosDeSaludMental:ppl.persona.salud_mental,
            datosDeSaludFisica:ppl.persona.salud_fisica,
            datosLimitacionesIdiomaticas:ppl.persona.limitacion_idiomatica,
            datosDeSeguridad:ppl.persona.seguridad,
            datosFamiliares:ppl.persona.datosFamiliares,
            datosJudiciales:ppl.persona.situacionJudicial,



          }
        })
        return pplsDTOs;

  }
  async getPPLsByEstablecimiento(establecimiento:number):Promise<Array<PplDTO>>{
    
    const ppls:Array<Ppl> = await this.dataService.ppl.getAllPPLsByEstablecimiento(establecimiento);
    const pplsDTOs:Array<PplDTO> = ppls.map(
      (ppl) =>{
          return{
            nombre:ppl.persona.nombre,
            apellido:ppl.persona.apellido,
            apodo:ppl.persona.datosPersonales.apodo,
            genero:ppl.persona.genero.id,
            fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
            estado_perfil:this.verificar_perfil(ppl.persona),
            datosPersonales:ppl.persona.datosPersonales,
            datosDeSalud:ppl.persona.salud,
            datosDeSaludMental:ppl.persona.salud_mental,
            datosDeSaludFisica:ppl.persona.salud_fisica,
            datosLimitacionesIdiomaticas:ppl.persona.limitacion_idiomatica,
            datosDeSeguridad:ppl.persona.seguridad,
            datosFamiliares:ppl.persona.datosFamiliares,
            datosJudiciales:ppl.persona.situacionJudicial,



          }
        })
        return pplsDTOs;

  }

  // async getPPLByCI(numeroDeIdentificacion:string):Promise<PplDTO> | null{

  // }
  verificar_perfil(persona:Persona){
    return true;
  }

}