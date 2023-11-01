import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserTypeEntity } from "../data-services/postgres/model/user-type.model";
import { Repository } from "typeorm";

@ValidatorConstraint({async: true})
export class ExisteTipoDeUsuario implements ValidatorConstraintInterface{
  constructor(
    @InjectRepository(UserTypeEntity)
    private userTypeRepository:Repository<UserTypeEntity>
    
  ){}
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const userTypeFound = this.userTypeRepository.findOneBy({
      id:value
    })
    if(userTypeFound){
      return true;
    }
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error("Method not implemented.");
  }
  
}
export function ExisteTipoUsuario(property:string, validationOptions?:ValidationOptions){
  return function(object: Object, propertyName: string){
    registerDecorator({
      name: 'existeTipoDeUsuario',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator:ExisteTipoDeUsuario,
    })
  }
}