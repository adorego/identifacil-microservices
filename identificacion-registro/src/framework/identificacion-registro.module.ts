import { Module } from "@nestjs/common";
import { RegistroController } from "src/framework/registro.controller";
import { RegistroUseCasesModule } from "src/use-cases/registro-use-case.module";

@Module({
  imports:[
    RegistroUseCasesModule
  ],
  providers:[
    
  ],
  controllers:[
    RegistroController
  ]
})

export class RegistroIdentificacionModule{}