import * as https from 'https';

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { DatosPoliciaDTO } from "src/core/dtos/DatosPoliciaDTO";
import { IPoliciaServices } from "src/core/abstracts/policia-services.abstract";
import fetch from "node-fetch";

let base64 = require('base-64');
@Injectable()
export class PoliciaServices implements IPoliciaServices{
  constructor(private configService:ConfigService){

  }
  async getDatosCI(cedula: string): Promise<DatosPoliciaDTO> {
    const policiaUrl = this.configService.get<string>('URL_POLICIA') + cedula;
    const usuario = this.configService.get<string>('USER_POLICIA');
    const clave = this.configService.get<string>('CLAVE_POLICIA');
    console.log(policiaUrl+','+usuario+','+clave);
    
    try{
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    
      const response = await fetch(policiaUrl,{
        agent: httpsAgent,
        method:'GET',
        headers: {'Authorization': 'Basic ' + base64.encode(usuario + ':' + clave)}
      })
      if(response.ok){
        const data = response.json();
        return data as Promise<DatosPoliciaDTO>
      }else{
        throw new HttpException(`Error al consultar los datos de la cedula,${response.text}`, HttpStatus.BAD_REQUEST);
      }
      
      
    }catch(error){
      console.log("Ocurrio un error:",error);
    }
    
    
  }
  
}
