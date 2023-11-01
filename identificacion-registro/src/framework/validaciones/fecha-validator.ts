import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

export function IsDateNotGreaterThanMaxDate(maxDate: Date, validationOptions?: ValidationOptions){
  return (object: any, propertyName: string) =>{
    registerDecorator({
      name: 'IsDateNotGreaterThanMaxDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxDate],
      validator:{
        validate(value: any, args: ValidationArguments){
          console.log("args.constraints:", args.constraints);
          const [maxDate] = args.constraints;
          console.log("maxDate:", maxDate);
          return value <= maxDate;
        }
      }
    })
  }
}