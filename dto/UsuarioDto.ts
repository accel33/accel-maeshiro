import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Validate,
  IsEnum,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { RolEnum } from '../entities/Usuario';

export class UsuarioDto {
  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  password: string;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  nombre: string;

  @IsNumber({}, { message: (args) => `${args.property} debe ingresar numeros` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  telefono: string;

  @IsEnum(RolEnum, {
    message: (args) =>
      `${args.property} debe ser Encargado, Vendedor, Delivery o Repartidor`,
  })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  rol: RolEnum;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  puesto: string;

  @IsEmail(undefined, {
    message: (args) => `${args.property} no es un email valido`,
  })
  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  email: string;
}
