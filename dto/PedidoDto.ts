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
  @IsOptional()
  fechaPedido: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  @IsOptional()
  fechaRecepcion: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  @IsOptional()
  fechaDespacho: Date;

  @IsDate({ message: (args) => `${args.property} debe ingresar fecha` })
  @IsOptional()
  fechaEntrega: Date;

  @IsEnum(EstadoEnum, {
    message: (args) =>
      `${args.property} debe ser Por atender, En proceso, Delivery o Recibido`,
  })
  @IsOptional()
  estado: EstadoEnum;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsOptional()
  vendedor: string;

  @IsString({ message: (args) => `${args.property} debe ingresar caracteres` })
  @IsOptional()
  repartidor: string;

  @IsArray({ message: (args) => `${args.property} debe arreglo de strings` })
  // @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  @IsOptional()
  productos: string[];
}
