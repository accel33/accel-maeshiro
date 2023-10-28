import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Pedido } from '../models/Pedido';

export enum RolEnum {
  ENCARGADO = 'Encargado',
  VENDEDOR = 'Vendedor',
  DELIVERY = 'Delivery',
  REPARTIDOR = 'Repartidor',
}

@Entity('usuarios')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  codigo_de_trabajador: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({
    type: 'enum',
    enum: RolEnum,
    default: RolEnum.REPARTIDOR,
  })
  rol: RolEnum.REPARTIDOR;

  @Column()
  puesto: string;

  @OneToOne(
    () => Pedido,
    (pedido) => (pedido.vendedor ? pedido.vendedor : pedido.repartidor)
  )
  pedido: Pedido[];
}
