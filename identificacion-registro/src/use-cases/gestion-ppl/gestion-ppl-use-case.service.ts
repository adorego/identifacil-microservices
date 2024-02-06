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
            numero_de_identificacion:ppl.persona.numero_identificacion,
            apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
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
        console.log("Array de PPLs:",pplsDTOs);
        return pplsDTOs;

  }
  async getPPLsByEstablecimiento(establecimiento:number):Promise<Array<PplDTO>>{
    
    const ppls:Array<Ppl> = await this.dataService.ppl.getAllPPLsByEstablecimiento(establecimiento);
    console.log("PPls devueltos:", ppls);
    const pplsDTOs:Array<PplDTO> = ppls.map(
      (ppl) =>{
          console.log(ppl);
          return{
            nombre:ppl.persona.nombre,
            apellido:ppl.persona.apellido,
            numero_de_identificacion:ppl.persona.numero_identificacion,
            apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
            genero:ppl.persona.genero ? ppl.persona.genero.id : null,
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
        console.log("Array de PPLs:",pplsDTOs);
        return pplsDTOs;

  }

  async getPPLByCedula(ci:string):Promise<PplDTO> | null{
    const ppl = await this.dataService.ppl.getPplByCedula(ci);
    if(!ppl){
      return null
    }else{
      return{
        nombre:ppl.persona.nombre,
        apellido:ppl.persona.apellido,
        numero_de_identificacion:ppl.persona.numero_identificacion,
        apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
        genero:ppl.persona.genero ? ppl.persona.genero.id : null,
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
    }
  }

  
  verificar_perfil(persona:Persona){
    return true;
  }

}