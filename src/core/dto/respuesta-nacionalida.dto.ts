import { Nacionalidad } from "../entities/nacionalidad";

export class RespuestaNacionalidadDTO{
  nacionalidades:Array<Nacionalidad>;
  success:boolean;
}