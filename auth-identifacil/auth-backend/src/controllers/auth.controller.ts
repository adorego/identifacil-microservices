import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/core/dtos/register-user.dto";
import { RegisteredUserResponseDto } from "src/core/dtos/register-user-response.dto";
import { RegistrarUseCases } from "src/use-cases/registrar/registrar.use-case";
import { UserFactoryService } from "src/use-cases/registrar/registrar-factory.service";

@Controller('api/auth')
export class AuthController{

  constructor(
      private userFactory:UserFactoryService,
      private registrarUseCase:RegistrarUseCases
    ){}

  @Get()
  saludar(){
    console.log("Entro en saludar");
    return "Hola Identifacil"
  }
  @Post('registrar')
  async registrar(@Body() createUser:RegisterUserDto):Promise<RegisteredUserResponseDto>{
    console.log(createUser);
    const userToCreate = this.userFactory.createNewUser(createUser);
    const jwt =  await this.registrarUseCase.createUser(userToCreate);
    const registeredUserResponse = new RegisteredUserResponseDto();
    registeredUserResponse.jwt = jwt;
    return registeredUserResponse;

  }

  
}