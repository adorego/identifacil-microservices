import { Vacuna } from "../entities/vacuna.entity";

export class RespuestaVacunasDTO{
  vacunas:Array<Vacuna>;
  success:boolean;

}