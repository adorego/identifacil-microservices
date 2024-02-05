import { Injectable } from "@nestjs/common";

@Injectable()
export class Float32ConveterService{
  transformar_array_a_descriptor(dato:Array<string>):Float32Array{
    const descriptor:Float32Array = new Float32Array(128);
    dato.map(
      (valor,index) =>
      descriptor[index] = parseFloat(valor)
    )
    return descriptor;
  }

  transformar_objeto_a_array(dato:Float32Array):Float32Array{
    const keys = Object.keys(dato);
    const descriptor = new Float32Array(keys.length);
    keys.forEach(
      (key,index) =>{
        descriptor[index] = dato[key];
      }
    )
    return descriptor;
    
  }
}