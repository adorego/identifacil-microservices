import { Injectable } from "@nestjs/common";
import { PasswordEncriptation } from "src/core/abstract/password-encription.abstract";
import { RegisterUserDto } from "src/core/dtos/register-user.dto";
import { User } from "src/core/entities/user.entity";

@Injectable()
export class UserFactoryService{
  constructor(private encriptationService:PasswordEncriptation){}
  createNewUser(createUserDTO:RegisterUserDto):User{
    const newUser = new User();
    newUser.ci = createUserDTO.ci;
    newUser.nombre = createUserDTO.nombre;
    newUser.apellido = createUserDTO.apellido;
    [newUser.salt, newUser.hash] = this.encriptationService.generatePasswordHashAndSalt(createUserDTO.clave);
    
    
    return newUser;
  }
}