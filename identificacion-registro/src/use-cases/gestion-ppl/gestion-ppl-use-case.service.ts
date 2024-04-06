import { IDataService } from "src/core/abstract/data-service.abstract";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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
      let pplsDTO:Array<PplDTO> = new Array<PplDTO>();
      if(ppls && ppls.length > 0){
        pplsDTO = ppls.map(
          (ppl) =>{
            
            return this.crear_dto_ppl(ppl)
          }
        )

      }
      return pplsDTO;
      
        
          
        
    }catch(error){
      this.logger.error(`Error en la consulta de getAllPpls de GestionPplUseCase:${error}`);
      throw new HttpException(`Error en la consulta de getAllPpls de GestionPplUseCase:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    

  }

  async getPPLsByEstablecimiento(establecimiento:number):Promise<Array<PplDTO>>{
    
    try{
      const ppls:Array<Ppl> = await this.dataService.ppl.getAllPPLsByEstablecimiento(establecimiento);
      let pplsDTO:Array<PplDTO> = new Array<PplDTO>();
      if(ppls && ppls.length > 0){
        pplsDTO = ppls.map(
            (ppl) =>{
              
              return this.crear_dto_ppl(ppl)
            }
          )

        }
        return pplsDTO;
      
        
          
        
    }catch(error){
      this.logger.error(`Error en la consulta de getPPLsByEstablecimiento de GestionPplUseCase:${error}`);
      throw new HttpException(`Error en la consulta de getPPLsByEstablecimiento de GestionPplUseCase:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async getPPLByCedula(ci:string):Promise<PplDTO> | null{
    try{
      const ppl = await this.dataService.ppl.getPplByCedula(ci);
      if(!ppl){
        return null
      }else{
        
        return this.crear_dto_ppl(ppl)
      }
    }catch(error){
      this.logger.error(`Error en la consulta de getPPLByCedula de GestionPplUseCase:${error}`);
      throw new HttpException(`Error en la consulta de getPPLByCedula de GestionPplUseCase:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async getPpplById(id:number):Promise<PplDTO>|null{
    try{
      const ppl = await this.dataService.ppl.getPplById(id);
    
      if(!ppl){
        return null
      }else{
        
        return this.crear_dto_ppl(ppl)
      }
    }catch(error){
      this.logger.error(`Error en la consulta de getPpplById de GestionPplUseCase:${error}`);
      throw new HttpException(`Error en la consulta de getPpplById de GestionPplUseCase:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
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

  crear_dto_ppl(ppl:Ppl):PplDTO{
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
      es_extranjero:ppl.persona.es_extranjero,
      contactoDeEmbajada:ppl.persona.contactoDeEmbajadaoConsulado,
      tiene_contacto_en_embajada:ppl.persona.tiene_contacto_en_embajada,
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
  }

}