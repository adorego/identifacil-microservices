import { FileService } from "./files.service";
import { Float32ConveterService } from "./float32-converter.service";
import { Module } from "@nestjs/common";

@Module({
  providers:[
    FileService,
    Float32ConveterService
  ],
  exports:[
    FileService,
    Float32ConveterService
  ]
})


export class LibModule{}