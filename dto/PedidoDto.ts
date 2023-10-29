import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { EstadoEnum } from '../entities/Pedido';

export class PedidoDto {
  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  fecha_pedido: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  fecha_recepcion: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  fecha_despacho: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  fecha_entrega: Date;

  @IsEnum(EstadoEnum, {
    message: (args) =>
      `${args.property} debe ser Por atender, En proceso, Delivery o Recibido`,
  })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  estado: EstadoEnum;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  vendedor: string;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  repartidor: string;

  @IsArray({ message: (args) => `${args.property} debe arreglo de strings` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  productos: string[];
}
