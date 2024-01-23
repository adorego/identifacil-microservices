import { FileService } from "./files.service";
import { Module } from "@nestjs/common";

@Module({
  providers:[
    FileService
  ],
  exports:[
    FileService
  ]
})


export class LibModule{}