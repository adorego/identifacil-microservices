import { DatosPoliciaDTO } from "src/core/dtos/DatosPoliciaDTO";
import { IPoliciaServices } from "src/core/abstracts/policia-services.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsultaCIService{
  constructor(
    private policiaService: IPoliciaServices
  ){}

  async consultarCI(cedula:string):Promise<DatosPoliciaDTO>{
    // console.log("ConsultarCI Use Case, cedula:", cedula);
    try{
      const datos = await this.policiaService.getDatosCI(cedula);
      return datos;
    }catch(error){
      console.log('Ocurrio un error:', error);
      throw error
    }
  }
}