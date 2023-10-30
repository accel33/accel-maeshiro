import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class ProductoDto {
  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  nombre: string;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  tipo: string;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  etiquetas: string;

  @IsNumber({}, { message: (args) => `${args.property} debe ingresar numeros` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  precio: number;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  unidad_de_medida: string;
}
