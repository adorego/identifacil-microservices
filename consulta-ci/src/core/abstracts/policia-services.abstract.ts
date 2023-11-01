import { DatosPoliciaDTO } from "../dtos/DatosPoliciaDTO";

export abstract class IPoliciaServices{
  abstract getDatosCI(cedula:string):Promise<DatosPoliciaDTO>
}