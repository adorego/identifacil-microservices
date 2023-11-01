import { Injectable } from "@nestjs/common";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";
import { RegistroPersonaDTO } from "src/core/dto/registro-persona.dto";
import { createWriteStream } from "fs";
import path from "path";

@Injectable()
export class RegistroFactory{
  async crearRegistro(crearRegistroPersonaDTO:RegistroPersonaDTO, fotos:{
    foto1:Array<Express.Multer.File>,
    foto2:Array<Express.Multer.File>,
    foto3:Array<Express.Multer.File>
  }){
    const persona = new Persona();
    persona.tipo_identificacion = crearRegistroPersonaDTO.tipo_identificacion;
    persona.numero_identificacion = crearRegistroPersonaDTO.numero_identificacion;
    persona.nombre = crearRegistroPersonaDTO.nombre;
    persona.apellido = crearRegistroPersonaDTO.apellido;
    persona.genero = crearRegistroPersonaDTO.genero;
    persona.fechaDeNacimiento = new Date(crearRegistroPersonaDTO.fechaDeNacimiento);
    const registro = new RegistroPersona();
    registro.foto1 = await this.almacenar_foto(fotos.foto1,1,`${persona.numero_identificacion}`);
    registro.descriptorFacial1 = crearRegistroPersonaDTO.descriptorFacial1;
    registro.foto2 = await this.almacenar_foto(fotos.foto2, 2, `${persona.numero_identificacion}`);
    registro.descriptorFacial2 = crearRegistroPersonaDTO.descriptorFacial2;
    registro.foto3 = await this.almacenar_foto(fotos.foto3, 3, `${persona.numero_identificacion}`);
    registro.descriptorFacial3 = crearRegistroPersonaDTO.descriptorFacial3;
    registro.fecha_registro = new Date();
    persona.registro = registro;
    return persona;
  }

  async almacenar_foto(foto:Array<Express.Multer.File>, numero_foto:number, numero_identificacion:string):Promise<string>{
      const fileName = `${numero_identificacion}_${numero_foto.toString()}`;
      const dirPath = path.join(__dirname, 'uploads', fileName);

      const writeStream = createWriteStream(dirPath);
      writeStream.write(foto[0].buffer);
      writeStream.end();

      return dirPath;
  }

}