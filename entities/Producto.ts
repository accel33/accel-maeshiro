import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './Pedido';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  sku: string;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column()
  etiquetas: string;

  @Column()
  precios: number;

  @Column()
  unidad_de_medida: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.productos)
  pedido: Pedido;
}
