import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-services.abstract";
import { usuarioDTO } from "src/core/dtos/usario.dto";
import {hash,compare,genSalt} from 'bcryptjs'
import { Usuario } from "src/core/entities/usuario.entity";
import { isNumber } from "class-validator";

const SALTROUNDS = 10;
@Injectable()
export class AuthUseCases{
    private readonly logger = new Logger("AuthUseCases");

    constructor(
        private dataService:IDataService
    ){}

    async createUser(usuario:usuarioDTO,roles:Array<number>){
        
        const resultadoValidacion = this.validarUsuario(usuario,roles);
        const salt = await genSalt(SALTROUNDS);
        const createdHash = await hash(usuario.clave,salt);

        const nuevoUsuario = new Usuario();
        nuevoUsuario.nombre

    }

    async validarUsuario(usuarioDTO:usuarioDTO,roles:Array<number>){
        if(!usuarioDTO.nombres){
            throw new HttpException("Se debe enviar un nombre de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.apellidos){
            throw new HttpException("Se debe enviar un apellido de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.ci || !isNumber(usuarioDTO.ci)){
            throw new HttpException("Se debe enviar numero de cedula valido",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.clave){
            throw new HttpException("Se debe enviar una clave valida",HttpStatus.BAD_REQUEST);
        }

        if(roles.length==0){
            throw new HttpException("La lista de roles no puede ser cero",HttpStatus.BAD_REQUEST);
        }
    }

}