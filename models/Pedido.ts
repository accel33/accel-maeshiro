import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { Producto } from './Producto';

export enum EstadoEnum {
  POR_ATENDER = 'Por atender',
  EN_PROCESO = 'En proceso',
  DELIVERY = 'Delivery',
  RECIBIDO = 'Recibido',
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

  @OneToOne(() => Usuario, (usuario) => usuario.pedido)
  vendedor: Usuario;

  @OneToOne(() => Usuario, (usuario) => usuario.pedido)
  repartidor: Usuario;

  @OneToOne(() => Producto, (producto) => producto.pedido)
  productos: Producto[];
}
