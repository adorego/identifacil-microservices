
export abstract class PasswordEncriptation{
  abstract generatePasswordHashAndSalt(password:string):string[];
  abstract validatePassword(password:string, salts:string, currentHash:string):boolean;
  abstract generateJwt(id_usuario:string, nombre:string, ci:string):string;
}