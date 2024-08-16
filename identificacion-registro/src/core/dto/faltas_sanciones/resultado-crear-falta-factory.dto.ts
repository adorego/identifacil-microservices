import { Falta } from "src/core/entities/falta.entity";
import { GradoDeFalta } from "src/core/entities/grado-de-falta.entity"
import { Ppl } from "src/core/entities/ppl.entity";
import { Sancion } from "src/core/entities/sancion.entity";
import { TipoDeVictima } from "src/core/entities/tipo-victima.entity";
import { TipoDeFalta } from "src/core/entities/tipo_de_falta.entity";


export class ResultadoCrearFaltaFactoryDTO{
    grado_de_falta:GradoDeFalta;
    nueva_falta:Falta;
    ppl:Ppl;
    sanciones_aplicadas:Array<Sancion>;
    tipos_de_victimas:Array<TipoDeVictima>;
    tipo_de_falta:TipoDeFalta;
}