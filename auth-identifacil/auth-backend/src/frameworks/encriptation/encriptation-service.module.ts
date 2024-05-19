import { CriptoEncriptionService } from "./cripto-encription.service";
import { Module } from "@nestjs/common";
import { PasswordEncriptation } from "src/core/abstract/password-encription.abstract";

@Module({
  imports:[

  ],
  providers:[
    {
      provide: PasswordEncriptation,
      useClass: CriptoEncriptionService
    }
  ],
  exports:[
    PasswordEncriptation
  ]
})
export class CriptoEncriptationServiceModule{}