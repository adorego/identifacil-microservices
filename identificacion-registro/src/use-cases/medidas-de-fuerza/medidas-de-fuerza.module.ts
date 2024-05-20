import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { MedidasDeFuerzaUseCase } from "./medidas-de-fuerza-use-case.service";
import { MedidasDeFuerzaFactory } from "./medidas-de-fuerza-factory.service";
import { MedidasDeFuerzaController } from "src/framework/controllers/medidadDeFuerza.controller";

@Module(
    {
      imports:[
        PostgresDataServiceModule
      ],
      providers:[
        MedidasDeFuerzaUseCase,
        MedidasDeFuerzaFactory
        
      ],
      controllers:[
        MedidasDeFuerzaController
      ]
      
    }
  )
  
  
  export class MedidaDeFuerzaModule{}