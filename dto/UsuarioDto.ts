import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Validate,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { RolEnum } from '../entities/Usuario';
import { Usuario } from '../interface/Usuario';

export class UsuarioDto implements Usuario {
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
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  email: string;
}
