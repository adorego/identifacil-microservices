import * as faceapi from "face-api.js";
import * as path from "path";

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { IdentificacionRespuestaDTO } from "src/core/dto/identificacion-respuesta.dto";

@Injectable()
export class IdentificacionUseCase{
  constructor(private dataService:IDataService){

  }
  async identificar(descriptorFacial:Float32Array):Promise<IdentificacionRespuestaDTO>{
    const personas = await this.dataService.persona.getAll();
    if(personas.length === 0){
      throw new NotFoundException('No existen registros en la Base de Datos');
    }
    // console.log("labeledDescriptor:", personas[0].numero_identificacion, this.transformar_array_a_descriptor(personas[0].registro.descriptorFacial1.split(',')));
    // console.log('descriptor generado:', descriptorFacial);
    const labeledDescriptors = personas.map(
      (persona) =>{
        return new faceapi.LabeledFaceDescriptors(persona.numero_identificacion,[
          this.transformar_array_a_descriptor(persona.registro.descriptorFacial1.split(',')),
          this.transformar_array_a_descriptor(persona.registro.descriptorFacial2.split(',')),
          this.transformar_array_a_descriptor(persona.registro.descriptorFacial3.split(','))
        ])
        // console.log(this.transformar_array_a_descriptor(persona.registro.descriptorFacial1.split(',')))
      }
    )
    await this.cargar_modelos();
    console.log("labeledDescriptors:", labeledDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    const resultado = faceMatcher.findBestMatch(this.transformar_objeto_a_array(descriptorFacial));
    console.log('El resultado es:', resultado);
    
    const persona_identificada = personas.find(
      (persona) =>{
        return persona.numero_identificacion === resultado.label
      }
    )
    if(!persona_identificada){
      throw new NotFoundException('Persona no identiificada');
    }
    return {
      nombres:persona_identificada.nombre,
      apellidos:persona_identificada.apellido,
      esPPL:persona_identificada.esPPL
    };
  }

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
  async cargar_modelos(){
    try{
      const modelsPath = path.join(__dirname,'../../models/')
      await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
      await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
    }catch(e){
      console.log('Ocurrio un error:', e);
      throw new HttpException('Error al cargar los modelos de reconocimiento facial', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}