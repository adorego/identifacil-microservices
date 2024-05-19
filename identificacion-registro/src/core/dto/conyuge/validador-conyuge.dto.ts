import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { TipoIdentificacion } from "src/core/entities/tipo-identificacion.entity";


export class validadorConyugeDTO{
    ppl:Ppl;
    tipo_de_identificacion:TipoIdentificacion;
    persona:Persona;
    
}