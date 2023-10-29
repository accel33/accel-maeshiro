import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Pedido } from './Pedido';

@Entity('productos')
export class Producto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  sku: string;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column()
  etiquetas: string;

  @Column()
  precio: number;

  @Column()
  unidad_de_medida: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.productos)
  pedido: Pedido;
}
