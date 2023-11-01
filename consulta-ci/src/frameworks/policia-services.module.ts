import { ConsultaCIController } from "./controllers/consultaci.controller";
import { ConsultaCIService } from "src/core/use-cases/consultaci/consultaci.use-case";
import { IPoliciaServices } from "src/core/abstracts/policia-services.abstract";
import { Module } from "@nestjs/common";
import { PoliciaServices } from "./services/policia-services.service";

@Module({
  providers:[
    {
      provide: IPoliciaServices,
      useClass:PoliciaServices
    },
    ConsultaCIService
  ],
  controllers:[
    ConsultaCIController
  ]
})

export class PoliciaServicesModule {}