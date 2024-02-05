import { EstadoCivil } from "../entities/estado-civil.entity";

export class RespuestaEstadoCivilDTO{
  estadosCiviles:Array<EstadoCivil>;
  success:boolean;
}