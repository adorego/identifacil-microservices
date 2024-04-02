import * as fs from "fs";
import * as path from "path";

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { ErrorPersonaEncontrada } from "src/framework/errors/error-persona-encontrada";
import { Float32ConveterService } from "src/framework/lib/float32-converter.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IdentificacionUseCase } from "./identificacion/identificacion-use-case.service";
import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";
import { RegistroPersonaDTO } from "src/core/dto/registro/registro-persona.dto";
import { RespuestaFactoryRegistroPPL } from "src/core/dto/registro/respuesta-factory-registro-ppl.dto";
import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";
import { RegistroFoto } from "src/core/entities/registro_foto.entity";
import { RespuestaGenerarRegistroDeFotos } from "src/core/dto/registro/respuesta-generar-registro-de-fotos.dto";

const FILE_STORAGE="/public"
const ASSETS_LOCATION="/archivos"

@Injectable()
export class  RegistroFactory{
  constructor(private dataService:IDataService,
    private identificarUseCase:IdentificacionUseCase,
    private float32ConverterService:Float32ConveterService
  ){}
  async crearRegistro(crearRegistroPersonaDTO:RegistroPersonaDTO, fotos:{
    foto1:Array<Express.Multer.File>,
    foto2:Array<Express.Multer.File>,
    foto3:Array<Express.Multer.File>
  }):Promise<RespuestaFactoryRegistroPPL>{
    
    //**********************Validaciones******************************//
    //Validar que la persona no este ya registrada
    if(crearRegistroPersonaDTO.tiene_cedula){
      const personaEncontrada = await this.dataService.persona.getByNumeroIdentificacion(crearRegistroPersonaDTO.numero_identificacion);
      // console.log('RegistroFactory:personaEncontrada:', personaEncontrada);
      if (personaEncontrada){
        throw new ErrorPersonaEncontrada('Esta persona ya está registrada');
      }

      
    }
    //Validar que este rostro ya no este en la base de datos
    const personaQueCoincide = await this.identificarUseCase.identificar(this.float32ConverterService.transformar_array_a_descriptor(crearRegistroPersonaDTO.descriptorFacial1.split(",")));
    if(personaQueCoincide.identificado){
      throw new ErrorPersonaEncontrada('Ya existe una persona con este rostro');
    }

    //Validar tipo de documento
    const tipo_identificacion = await this.dataService.tipo_identificacion.get(parseInt(crearRegistroPersonaDTO.tipo_identificacion));

    if(!tipo_identificacion){
      throw new NotFoundException('Tipo de identificación no encontrado')
    }
    
    //Validar que el tipo de identificacion sea valido
    const genero = await this.dataService.genero.get(parseInt(crearRegistroPersonaDTO.genero))
    // console.log('Genero:', genero);

    if(!genero){
      throw new NotFoundException('Genero no encontrado')
    }

    let establecimiento_penitenciario = null;
    //Validar establecimiento del PPL
    if(crearRegistroPersonaDTO.esPPL === "true"){
      establecimiento_penitenciario = await this.dataService.establecimientoPenitenciario.get(parseInt(crearRegistroPersonaDTO.establecimiento));
      if(!establecimiento_penitenciario){
        throw new NotFoundException("No se encuentra el establecimiento penitenciario enviado");
      }
    }
    // console.log("DTO:", crearRegistroPersonaDTO);
    
    const persona = new Persona();
    persona.tipo_identificacion = tipo_identificacion;
    
    persona.numero_identificacion = crearRegistroPersonaDTO.numero_identificacion;
    persona.nombre = crearRegistroPersonaDTO.nombres;
    persona.apellido = crearRegistroPersonaDTO.apellidos;
    persona.esPPL = crearRegistroPersonaDTO.esPPL === "true" ? true : false;
    persona.es_extranjero = crearRegistroPersonaDTO.es_extranjero === "true" ? true : false;
    persona.tiene_cedula = crearRegistroPersonaDTO.tiene_cedula === "true" ? true : false;
    persona.genero = genero;
    persona.fechaDeNacimiento = new Date(`${crearRegistroPersonaDTO.fechaDeNacimiento}`);
    const registro = new RegistroPersona();
    
    // registro.descriptorFacial1 = this.transformar_descriptor(crearRegistroPersonaDTO.descriptorFacial1.toString());
    // registro.descriptorFacial2 = this.transformar_descriptor(crearRegistroPersonaDTO.descriptorFacial2.toString());
    // registro.descriptorFacial3 = this.transformar_descriptor(crearRegistroPersonaDTO.descriptorFacial3.toString());
    
    // registro.descriptorFacial1 = Float32Array.from(crearRegistroPersonaDTO.descriptorFacial1.split(","), parseFloat);
    // registro.descriptorFacial2 = Float32Array.from(crearRegistroPersonaDTO.descriptorFacial2.split(","), parseFloat);
    // registro.descriptorFacial3 = Float32Array.from(crearRegistroPersonaDTO.descriptorFacial3.split(","), parseFloat);
    registro.descriptorFacial1 = crearRegistroPersonaDTO.descriptorFacial1;
    registro.descriptorFacial2 = crearRegistroPersonaDTO.descriptorFacial2;
    registro.descriptorFacial3 = crearRegistroPersonaDTO.descriptorFacial3;
    
    // console.log("descriptor:", registro.descriptorFacial1, typeof(registro.descriptorFacial1), Array.isArray(registro.descriptorFacial1));
    
    registro.foto1 = await this.almacenar_foto(fotos.foto1,1,`${persona.numero_identificacion}`);
    registro.foto2 = await this.almacenar_foto(fotos.foto2, 2, `${persona.numero_identificacion}`);
    registro.foto3 = await this.almacenar_foto(fotos.foto3, 3, `${persona.numero_identificacion}`);
    registro.fecha_registro = new Date();
    // console.log('Persona:', persona);
    // console.log('Registro:', registro);
    persona.registro = registro;
    
    let contactoEnEmbajadaCreado:ContactoEnEmbajada = null;
    if(crearRegistroPersonaDTO.es_extranjero && crearRegistroPersonaDTO. mantiene_contacto_con_consulado_o_embajada){
        const pais = await this.dataService.pais.get(crearRegistroPersonaDTO.pais_de_embajada);
        if(pais === null){
          throw new HttpException(`No se encuentra el país enviado`,HttpStatus.BAD_REQUEST);
        }
         const contactoEnEmbajada = new ContactoEnEmbajada();
         contactoEnEmbajada.nombre =  crearRegistroPersonaDTO.nombre_de_contacto_en_consulado_o_embajada;
         contactoEnEmbajada.numero = crearRegistroPersonaDTO.numero_de_contacto_en_consulado_o_embajada;
         contactoEnEmbajada.pais = pais;
         const contactoDeEmbajadaEncontrado = await this.dataService.contactoDeEmbajada.getContactoDeEmbajadaByDatos(contactoEnEmbajada.nombre,contactoEnEmbajada.numero,contactoEnEmbajada.pais);
         if(contactoDeEmbajadaEncontrado!==null){
          contactoEnEmbajadaCreado = contactoDeEmbajadaEncontrado
         }else{
          contactoEnEmbajadaCreado = await this.dataService.contactoDeEmbajada.create(contactoEnEmbajada)
         }
         persona.contactoDeEmbajadaoConsulado = contactoEnEmbajadaCreado;
    }
    
    if(persona.esPPL){
      const ppl = new Ppl();
      ppl.persona = persona;
      ppl.establecimiento_penitenciario = establecimiento_penitenciario;
      if(!crearRegistroPersonaDTO.tiene_cedula){
        ppl.prontuario = crearRegistroPersonaDTO.prontuario;
      }
      return{
        persona:persona,
        ppl:ppl
      }
      
    }
    return {
      persona:persona,
      ppl:null
    }
  }

  async generar_registro_de_fotos(
    foto1:Array<Express.Multer.File>,nombre_foto1:string,
    foto2:Array<Express.Multer.File>,nombre_foto2:string,
    foto3:Array<Express.Multer.File>,nombre_foto3:string,
    foto4:Array<Express.Multer.File>,nombre_foto4:string,
    foto5:Array<Express.Multer.File>,nombre_foto5:string,
    id_persona:number):Promise<RespuestaGenerarRegistroDeFotos>{
      
      
      const pplEncontrado:Ppl = await this.dataService.ppl.getPPLByIdPersona(id_persona);
      if(!pplEncontrado){
        throw new HttpException(`No se encontró la persona enviada:${id_persona}`,HttpStatus.BAD_REQUEST);
      }
      const personaEncontrada:Persona = await this.dataService.persona.get(id_persona);
      if(!personaEncontrada){
        throw new HttpException(`No se encontró la persona enviada:${id_persona}`,HttpStatus.BAD_REQUEST);
      }

      const registro_de_fotos:Array<RegistroFoto> = new Array<RegistroFoto>();

      if(foto1){
        const archivo_foto1 = await this.almacenar_foto_registro(foto1,`${pplEncontrado.persona.numero_identificacion}-${nombre_foto1}`);
        const registro_foto1 = new RegistroFoto();
        registro_foto1.nombre = nombre_foto1;
        registro_foto1.foto = archivo_foto1;
        registro_foto1.ppl = pplEncontrado;
        registro_de_fotos.push(registro_foto1);
      }
     
      if(foto2){
        const archivo_foto2 = await this.almacenar_foto_registro(foto2,`${pplEncontrado.persona.numero_identificacion}-${nombre_foto2}`);
        const registro_foto2 = new RegistroFoto();
        registro_foto2.nombre = nombre_foto2;
        registro_foto2.foto = archivo_foto2;
        registro_foto2.ppl = pplEncontrado;
        registro_de_fotos.push(registro_foto2);
      }
      

      if(foto3){
        const archivo_foto3 = await this.almacenar_foto_registro(foto3,`${pplEncontrado.persona.numero_identificacion}-${nombre_foto3}`);
        const registro_foto3 = new RegistroFoto();
        registro_foto3.nombre = nombre_foto3;
        registro_foto3.foto = archivo_foto3;
        registro_foto3.ppl = pplEncontrado;
        registro_de_fotos.push(registro_foto3);
      }
     
     
      if(foto4){
        const archivo_foto4 = await this.almacenar_foto_registro(foto4,`${pplEncontrado.persona.numero_identificacion}-${nombre_foto4}`);
        const registro_foto4 = new RegistroFoto();
        registro_foto4.nombre = nombre_foto4;
        registro_foto4.foto = archivo_foto4;
        registro_foto4.ppl = pplEncontrado;
        registro_de_fotos.push(registro_foto4);
      }
      
      if(foto5){
        const archivo_foto5 = await this.almacenar_foto_registro(foto5,`${pplEncontrado.persona.numero_identificacion}-${nombre_foto5}`);
        const registro_foto5 = new RegistroFoto();
        registro_foto5.nombre = nombre_foto5;
        registro_foto5.foto = archivo_foto5;
        registro_foto5.ppl = pplEncontrado;
        registro_de_fotos.push(registro_foto5);
      }
      

      return{
        registro_de_fotos:registro_de_fotos,
        ppl:pplEncontrado
      }

  }
  async almacenar_foto(foto:Array<Express.Multer.File>, numero_foto:number, numero_identificacion:string):Promise<string>{
    
      const fileName = `${numero_identificacion}_${numero_foto.toString()}.${foto[0].originalname.split('.').pop()}`;
      console.log('Nombre del archivo:', fileName);
      const dirPath = path.join(process.cwd(),FILE_STORAGE);
      //const dirPath = FILE_STORAGE
      if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, {recursive:true})
      }
      const finalPath = path.join(dirPath, fileName);
      console.log('finalPath:', finalPath);
      // console.log('Buffer de la foto:', foto[0].buffer);
      if(foto[0]){
        try{
          const writeStream = fs.createWriteStream(finalPath);
          writeStream.write(foto[0].buffer);
          writeStream.end();
        }catch(error){
          throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }else{
        console.log('La foto no existe');
        throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return path.join(ASSETS_LOCATION,fileName);
  }

  async almacenar_foto_registro(foto:Array<Express.Multer.File>, nombre_foto:string):Promise<string>{
    const fileName = `${nombre_foto}.${foto[0].originalname.split('.').pop()}`;
    console.log('Nombre del archivo:', fileName);
    const dirPath = path.join(process.cwd(),FILE_STORAGE);
    //const dirPath = FILE_STORAGE;
    if(!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath, {recursive:true})
    }
    const finalPath = path.join(dirPath, fileName);
    console.log('finalPath:', finalPath);
    // console.log('Buffer de la foto:', foto[0].buffer);
    if(foto[0]){
      try{
        const writeStream = fs.createWriteStream(finalPath);
        writeStream.write(foto[0].buffer);
        writeStream.end();
      }catch(error){
        throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }else{
      console.log('La foto no existe');
      throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return path.join(ASSETS_LOCATION,fileName);
}

  transformar_descriptor(dato:string):Array<number>{
     return dato.substring(1, dato.length).split(',').map(
      (item) => parseInt(item)
     )
  }

}