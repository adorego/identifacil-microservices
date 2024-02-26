import { DatosPenalesController } from "src/framework/controllers/datosPenales.controlles";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { DatosPenalesUseCases } from "./datos-penales-use-case.service";
import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";

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
    ]
  }
)


export class DatosPenalesModule{}