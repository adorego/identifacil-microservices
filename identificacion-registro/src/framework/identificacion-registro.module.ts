import { IdentificacionController } from "./identificacion.controller";
import { IdentificacionUseCaseModule } from "src/use-cases/identificacion-use-case.module";
import { Module } from "@nestjs/common";
import { RegistroController } from "src/framework/registro.controller";
import { RegistroUseCasesModule } from "src/use-cases/registro-use-case.module";

@Module({
  imports:[
    RegistroUseCasesModule,
    IdentificacionUseCaseModule
  ],
  providers:[
    
  ],
  controllers:[
    RegistroController,
    IdentificacionController
  ]
})

export class RegistroIdentificacionModule{}