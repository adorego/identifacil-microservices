import { DatosPenalesUseCases } from "./datos-penales-use-case.service";
import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { DatosPenalesController } from "src/framework/controllers/datosPenales.controller";

@Module(
  {
    imports:[
      PostgresDataServiceModule
    ],
    providers:[
      DatosPenalesUseCases,
      DatosPenalesFactory
      
    ],
    controllers:[
      DatosPenalesController
    ],
    exports:[
      DatosPenalesUseCases
    ]
  }
)


export class DatosPenalesModule{}