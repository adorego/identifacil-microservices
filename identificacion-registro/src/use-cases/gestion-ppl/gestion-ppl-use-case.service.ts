import { IDataService } from "src/core/abstract/data-service.abstract";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";

interface RegistroFotosI{
  nombre:string;
  foto:string;
}
@Injectable()
export class GestionPPLUseCase{
  private readonly logger:Logger = new Logger("GestionPPLUseCase");
  constructor(
    private dataService:IDataService,
  ){}

  async getAllPpls():Promise<Array<PplDTO>>{
    try{
      //console.log("Antes de llamar a ppls");
      const ppls:Array<Ppl> = await this.dataService.ppl.getAll();
      //console.log("Get all PPLs:", ppls);
      const pplsDTOs:Array<PplDTO> = ppls.map(
      (ppl) =>{
        
        
          return{
            id_persona:ppl.persona.id,
            nombre:ppl.persona.nombre,
            apellido:ppl.persona.apellido,
            numero_de_identificacion:ppl.persona.numero_identificacion,
            apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
            genero:ppl.persona.genero ? ppl.persona.genero.id : null,
            foto:ppl.persona.registro.foto1,
            registro_de_fotos:this.obtener_fotos_registro(ppl),
            tipo_de_documento:ppl.persona.tipo_identificacion,
            fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
            establecimiento:ppl.establecimiento_penitenciario.id,
            establecimiento_nombre:ppl.establecimiento_penitenciario.nombre,
            estado_perfil:this.verificar_perfil(ppl.persona),
            datosPersonales:ppl.persona.datosPersonales,
            datosDeSalud:ppl.persona.salud,
            datosDeSeguridad:ppl.persona.seguridad,
            datosFamiliares:ppl.persona.datosFamiliares,
            datosJudiciales:ppl.persona.situacionJudicial,
            datosEducacion:ppl.persona.educacionFormacion,



          }
        })
        // console.log("Array de PPLs:",pplsDTOs);
        return pplsDTOs;
    }catch(error){
      this.logger.error(`Error en la consulta de PPL por id:${error}`);
      throw new HttpException(`Error en al consulta por id:${error}`, error);
    }
    

  }

  async getPPLsByEstablecimiento(establecimiento:number):Promise<Array<PplDTO>>{
    
    const ppls:Array<Ppl> = await this.dataService.ppl.getAllPPLsByEstablecimiento(establecimiento);
    // console.log("PPls devueltos:", ppls);
    const pplsDTOs:Array<PplDTO> = ppls.map(
      (ppl) =>{
        
          return{
            id_persona:ppl.persona.id,
            nombre:ppl.persona.nombre,
            apellido:ppl.persona.apellido,
            numero_de_identificacion:ppl.persona.numero_identificacion,
            apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
            genero:ppl.persona.genero ? ppl.persona.genero.id : null,
            tipo_de_documento:ppl.persona.tipo_identificacion,
            fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
            establecimiento:ppl.establecimiento_penitenciario?.id ?? null,
            establecimiento_nombre:ppl.establecimiento_penitenciario?.nombre,
            nacionalidad:ppl.persona.datosPersonales?.nacionalidad?.id ? ppl.persona.datosPersonales.nacionalidad.id : null,
            estado_perfil:this.verificar_perfil(ppl.persona),
            datosPersonales:ppl.persona.datosPersonales,
            foto:ppl.persona.registro.foto1,
            registro_de_fotos:this.obtener_fotos_registro(ppl),
            datosDeSalud:ppl.persona.salud,
            datosDeSeguridad:ppl.persona.seguridad,
            datosFamiliares:ppl.persona.datosFamiliares,
            datosJudiciales:ppl.persona.situacionJudicial,
            datosEducacion:ppl.persona.educacionFormacion,



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
        
        id_persona:ppl.persona.id,
        nombre:ppl.persona.nombre,
        apellido:ppl.persona.apellido,
        numero_de_identificacion:ppl.persona.numero_identificacion,
        apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
        genero:ppl.persona.genero ? ppl.persona.genero.id : null,
        tipo_de_documento:ppl.persona.tipo_identificacion,
        fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
        establecimiento:ppl.establecimiento_penitenciario.id,
        establecimiento_nombre:ppl.establecimiento_penitenciario.nombre,
        foto:ppl.persona.registro.foto1,
        registro_de_fotos:this.obtener_fotos_registro(ppl),
        // nacionalidad:ppl.persona.datosPersonales?.nacionalidad?.id ? ppl.persona.datosPersonales.nacionalidad.id : null,
        estado_perfil:this.verificar_perfil(ppl.persona),
        datosPersonales:ppl.persona.datosPersonales,
        datosDeSalud:ppl.persona.salud,
        datosDeSeguridad:ppl.persona.seguridad,
        datosFamiliares:ppl.persona.datosFamiliares,
        datosJudiciales:ppl.persona.situacionJudicial,
        datosEducacion:ppl.persona.educacionFormacion,



      }
    }
  }

  async getPpplById(id:number):Promise<PplDTO>|null{
    const ppl = await this.dataService.ppl.getPplById(id);
    
    if(!ppl){
      return null
    }else{
      
      return{
        id_persona:ppl.persona.id,
        nombre:ppl.persona.nombre,
        apellido:ppl.persona.apellido,
        numero_de_identificacion:ppl.persona.numero_identificacion,
        apodo:ppl.persona.datosPersonales ? ppl.persona.datosPersonales.apodo : null,
        genero:ppl.persona.genero ? ppl.persona.genero.id : null,
        tipo_de_documento:ppl.persona.tipo_identificacion,
        foto:ppl.persona.registro.foto1,
        registro_de_fotos:this.obtener_fotos_registro(ppl),
        fechaDeNacimiento:ppl.persona.fechaDeNacimiento,
        establecimiento:ppl.establecimiento_penitenciario.id,
        establecimiento_nombre:ppl.establecimiento_penitenciario.nombre,
        // nacionalidad:ppl.persona.datosPersonales?.nacionalidad?.id ? ppl.persona.datosPersonales.nacionalidad.id : null,
        estado_perfil:this.verificar_perfil(ppl.persona),
        datosPersonales:ppl.persona.datosPersonales,
        datosDeSalud:ppl.persona.salud,
        datosDeSeguridad:ppl.persona.seguridad,
        datosFamiliares:ppl.persona.datosFamiliares,
        datosJudiciales:ppl.persona.situacionJudicial,
        datosEducacion:ppl.persona.educacionFormacion,
      }
    }
  }

  
  verificar_perfil(persona:Persona){
    return true;
  }

  obtener_fotos_registro(ppl:Ppl):Array<RegistroFotosI>{
    let registro_fotos:Array<RegistroFotosI> = new Array<RegistroFotosI>();
    if(ppl && ppl.registro_de_fotos && ppl.registro_de_fotos.length >0){
      registro_fotos = ppl.registro_de_fotos.map(
        (registro_foto)=>{
          return{
            nombre:registro_foto.nombre,
            foto:registro_foto.foto
          }
        }
      )
    }
    return registro_fotos;
  }

}