import { pbkdf2Sync, randomBytes } from "crypto";

import { Injectable } from "@nestjs/common";
import { PasswordEncriptation } from "src/core/abstract/password-encription.abstract";
import jwt from "jsonwebtoken"

@Injectable()
export class CriptoEncriptionService implements PasswordEncriptation{
  generatePasswordHashAndSalt(password: string): string[] {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
    return [salt, hash]
  }
  validatePassword(password: string, salts:string, currentHash:string): boolean {
    const hash = pbkdf2Sync(password, salts, 1000, 64, 'sha512').toString('hex');
    return currentHash === hash;
  }

  generateJwt(id_usuario:string, nombre:string, ci:string):string{
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    console.log("CriptoEncriptionService:", id_usuario, nombre, ci);
    return jwt.sign({
      _id_usuario: id_usuario,
      nombre:nombre,
      ci:ci,
      exp: expiry.getTime()/1000,
    }, process.env.JWT_SECRET)
  }
  
}