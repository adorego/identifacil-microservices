import * as fs from "fs";
import * as path from "path";

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { ErrorPersonaEncontrada } from "src/framework/errors/error-persona-encontrada";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";
import { RegistroPersonaDTO } from "src/core/dto/registro-persona.dto";

@Injectable()
export class RegistroFactory{
  constructor(private dataService:IDataService){}
  async crearRegistro(crearRegistroPersonaDTO:RegistroPersonaDTO, fotos:{
    foto1:Array<Express.Multer.File>,
    foto2:Array<Express.Multer.File>,
    foto3:Array<Express.Multer.File>
  }){
    
    //**********************Validaciones******************************//
    //Validar que la persona no este ya registrada
    const personaEncontrada = await this.dataService.persona.getByNumeroIdentificacion(crearRegistroPersonaDTO.numero_identificacion);
    // console.log('RegistroFactory:personaEncontrada:', personaEncontrada);
    if (personaEncontrada){
      throw new ErrorPersonaEncontrada('Esta persona ya está registrada');
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

    console.log("DTO:", crearRegistroPersonaDTO);
    
    const persona = new Persona();
    persona.tipo_identificacion = tipo_identificacion;
    
    persona.numero_identificacion = crearRegistroPersonaDTO.numero_identificacion;
    persona.nombre = crearRegistroPersonaDTO.nombres;
    persona.apellido = crearRegistroPersonaDTO.apellidos;
    persona.esPPL = crearRegistroPersonaDTO.esPPL === "true" ? true : false;
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
    return persona;
  }

  async almacenar_foto(foto:Array<Express.Multer.File>, numero_foto:number, numero_identificacion:string):Promise<string>{
      const fileName = `${numero_identificacion}_${numero_foto.toString()}${path.extname(foto[0].originalname)}`;
      console.log('Nombre del archivo:', fileName);
      const dirPath = path.join(process.env.TEST_FILE_STORAGE,'upload');
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

      return finalPath;
  }

  transformar_descriptor(dato:string):Array<number>{
     return dato.substring(1, dato.length).split(',').map(
      (item) => parseInt(item)
     )
  }

}