import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Usuario } from './Usuario';
import { Producto } from './Producto';

export enum EstadoEnum {
  POR_ATENDER = 0,
  EN_PROCESO = 1,
  DELIVERY = 2,
  RECIBIDO = 3,
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  numero_de_producto: string;

  @Column()
  fecha_pedido: Date;

  @Column()
  fecha_recepcion: Date;

  @Column()
  fecha_despacho: Date;

  @Column()
  fecha_entrega: Date;

  @Column({
    type: 'enum',
    enum: EstadoEnum,
    default: EstadoEnum.POR_ATENDER,
  })
  estado: EstadoEnum.POR_ATENDER;

  @OneToOne(() => Usuario, (usuario) => usuario.codigo_de_trabajador)
  vendedor: Usuario;

  @OneToOne(() => Usuario, (usuario) => usuario.codigo_de_trabajador)
  repartidor: Usuario;

  @OneToOne(() => Producto, (producto) => producto.pedido)
  productos: Producto[];
}
