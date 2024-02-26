import * as path from "path";

import * as fs from "fs";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";


const filePath = "/opt/identifacil/";

@Injectable()
export class FileService{
  async almacenar_archivo(archivo:Express.Multer.File, nombreDelArchivo:string):Promise<string>{
    let fileName = "";
    if(path){
      fileName = `${nombreDelArchivo}_${path.extname(archivo.originalname)}`;
    }else{
      fileName = `${filePath}${nombreDelArchivo}.${archivo.mimetype}`;
    }
    
    console.log("Nombre final de archiivo:", fileName);
    const dirPath = path.join(process.env.TEST_FILE_STORAGE,'upload');
    if(!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath, {recursive:true})
    }
    const finalPath = path.join(dirPath, fileName);
    if(archivo){
      try{
        const writeStream = fs.createWriteStream(finalPath);
        writeStream.write(archivo.buffer);
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
}
