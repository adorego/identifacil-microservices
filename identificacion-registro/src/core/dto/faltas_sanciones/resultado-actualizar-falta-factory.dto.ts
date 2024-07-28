import { Falta } from "src/core/entities/falta.entity";
import { GradoDeFalta } from "src/core/entities/grado-de-falta.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { Sancion } from "src/core/entities/sancion.entity";
import { TipoDeVictima } from "src/core/entities/tipo-victima.entity";




export class ResultadoActualizarFaltaFactoryDTO{
    grado_de_falta:GradoDeFalta;
    falta_a_actualizar:Falta;
    ppl:Ppl;
    sanciones_aplicadas:Array<Sancion>;
    tipos_de_victimas:Array<TipoDeVictima>;
}