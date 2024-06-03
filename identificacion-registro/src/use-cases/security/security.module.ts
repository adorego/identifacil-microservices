import { Module } from "@nestjs/common";
import { SecurityController } from "src/framework/controllers/security.controller";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";

@Module(
    {
      imports:[
        PostgresDataServiceModule
      ],
      providers:[
        
      ],
      controllers:[
        SecurityController
      ],
      exports:[
        
      ]
    }
  )
  
  
  export class ConyugeModule{}