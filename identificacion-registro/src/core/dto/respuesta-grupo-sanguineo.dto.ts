import { GrupoSanguineo } from "../entities/grupo-sanguineo.entity";

export class RespuestaGrupoSanguineoDTO{
  grupos_sanguineos:Array<GrupoSanguineo>;
  success:boolean;
}