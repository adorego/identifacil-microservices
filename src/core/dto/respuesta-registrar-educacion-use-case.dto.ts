import { EducacionFormacion } from "../entities/educacion-formacion.entity";

export class RespuestaRegistrarEducacionFormacionUseCaseDTO{
  success:boolean;
  educacionFormacionCreated:EducacionFormacion;
}