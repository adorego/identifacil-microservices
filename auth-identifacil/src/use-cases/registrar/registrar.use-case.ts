import { IDataRepository } from "src/core/abstract/data-services.abstract";
import { Injectable } from "@nestjs/common";
import { PasswordEncriptation } from "src/core/abstract/password-encription.abstract";
import { User } from "src/core/entities/user.entity";
import { UserEntity } from "src/frameworks/data-services/postgres/model/user.model";

@Injectable()
export class RegistrarUseCases{
  constructor(
    private dataService:IDataRepository<User>,
    private encritationService:PasswordEncriptation
  ){}

  async createUser(user:User):Promise<string>{
    try{
      // console.log("RegistrarUseCases:User:", user);

      const savedUser:UserEntity = await this.dataService.create(user);
      const jwt = this.encritationService.generateJwt(savedUser.id, savedUser.nombre, savedUser.ci);
      
      return jwt;
    }catch(error){
      console.log('Ocurrio un error:', error);
    }
  }
}