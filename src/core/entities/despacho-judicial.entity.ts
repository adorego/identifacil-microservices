import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";

export class DespachoJudicial{
  id:number;
  codigo:string;
  descripcion:string;
  circunscripcion_judicial:CircunscripcionJudicial;
}