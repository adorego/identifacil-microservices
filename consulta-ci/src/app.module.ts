import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { PoliciaServicesModule } from "./frameworks/policia-services.module";

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PoliciaServicesModule
  
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
