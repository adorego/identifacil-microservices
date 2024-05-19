import { Module } from "@nestjs/common";
import { ConyugeController } from "src/framework/controllers/conyuge.controller";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { ConyugeUseCases } from "./conyuge-use-case.service";
import { ConyugeFactory } from "./conyuge-factory.service";

@Module(
    {
      imports:[
        PostgresDataServiceModule
      ],
      providers:[
        ConyugeUseCases,
        ConyugeFactory
        
      ],
      controllers:[
        ConyugeController
      ],
      exports:[
        ConyugeUseCases
      ]
    }
  )
  
  
  export class ConyugeModule{}