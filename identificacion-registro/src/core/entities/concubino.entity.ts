import { DatosFamiliares } from "./datos-familiares.entity";
import { TipoIdentificacion } from "./tipo-identificacion.entity";


export class Concubino{
  id:number;
  numeroDeIdentificacion:string;
  nombres:string;
  apellidos:string;
  tipo_de_identificacion:TipoIdentificacion;
  es_extranjero:boolean;
  fecha_de_nacimiento:Date;
  edad:number;
  sexo:number;
  lugar_de_nacimiento:string;
  direccion:string;
  barrio:string;
  compania:string;
  numero_de_contacto:string;
  dias_de_visita:Array<number>//1:Domingo,2:Lunes....7:Sabado
  datosFamiliares:DatosFamiliares
}