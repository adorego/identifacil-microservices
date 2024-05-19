import { IsNotEmpty } from "class-validator";
import { User } from "../entities/usuario.entity";

export class RegisteredUserResponseDto{
  jwt:string;
}