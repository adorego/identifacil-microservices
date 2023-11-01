import { ConfigService } from "@nestjs/config";
import { DatosPoliciaDTO } from "src/core/dtos/DatosPoliciaDTO";
import { IPoliciaServices } from "src/core/abstracts/policia-services.abstract";
import { Injectable } from "@nestjs/common";
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
    let data:DatosPoliciaDTO | null = null;
    try{
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + base64.encode(usuario + ':' + clave));
      console.log(headers);
    
      data = await fetch(policiaUrl,{
        method:'GET',
        headers: headers
      })
      .then((response) => {
        return response.json()
      });
      console.log("Datos devueltos:",data);
      
    }catch(error){
      console.log(error);
    }
    
    return data;
  }
  
}
