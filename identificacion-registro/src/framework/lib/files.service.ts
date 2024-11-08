import * as path from "path";

import * as fs from "fs";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";




@Injectable()
export class FileService{
  async almacenar_archivo(archivo:Express.Multer.File, nombreDelArchivo:string):Promise<string>{
    let fileName = nombreDelArchivo +"."+ archivo.originalname.split('.').pop();
    try{
        
        console.log("Nombre final de archivo:", fileName);
        const dirPath =Number(process.env.PRODUCTION)==1 ? process.env.FILE_STORAGE_PROD : path.join(process.cwd(),process.env.FILE_STORAGE_DEV);
        //const dirPath = FILE_STORAGE;
        console.log("dirPath final:", dirPath);
        if(!fs.existsSync(dirPath)){
          fs.mkdirSync(dirPath, {recursive:true})
        }
        const finalPath = path.join(dirPath, fileName);
        console.log("Final path:", finalPath);
        if(archivo){
          try{
            const writeStream = fs.createWriteStream(finalPath);
            writeStream.write(archivo.buffer);
            writeStream.end();
            
          }catch(error){
            throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }else{
          
          throw new HttpException(`Error al guardar el archivo:${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
        return path.join(process.env.ASSETS_LOCATION,fileName);
      }catch(error){
        throw new HttpException(`Error al guardar el archivo ${fileName}:${error}`,error);
      }

  }

  async almacenar_foto(foto:Array<Express.Multer.File>, numero_foto:number, numero_identificacion:string):Promise<string>{
    const fileName = `${numero_identificacion}_${numero_foto.toString()}.${foto[0].originalname.split('.').pop()}`;
    console.log('Nombre del archivo:', fileName);
    const dirPath =Number(process.env.PRODUCTION)==1 ? process.env.FILE_STORAGE_PROD : path.join(process.cwd(),process.env.FILE_STORAGE_DEV);
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

    return path.join(process.env.ASSETS_LOCATION,fileName);
}
}
