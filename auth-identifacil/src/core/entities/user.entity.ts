import { pbkdf2Sync, randomBytes } from "crypto";

import { TypeUser } from "./type-user.entity";

export class User{
  id:string;
  ci:string;
  nombre:string;
  apellido:string;
  hash:string;
  salt:string;

  tipo:TypeUser;

  
  
}