import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { Producto } from './Producto';
import { AppDataSource } from '../config/data-source';

export enum EstadoEnum {
  POR_ATENDER = 'Por atender',
  EN_PROCESO = 'En proceso',
  DELIVERY = 'Delivery',
  RECIBIDO = 'Recibido',
}

@Entity('pedidos')
export class Pedido extends BaseEntity {
  @PrimaryColumn()
  numero_de_pedido: string;

  @CreateDateColumn()
  fecha_pedido: Date;

  @Column({ type: 'timestamptz' })
  fecha_recepcion: Date;

  @Column({ type: 'date' })
  fecha_despacho: Date;

  @Column({ type: 'date' })
  fecha_entrega: Date;

  @Column({
    type: 'enum',
    enum: EstadoEnum,
    default: EstadoEnum.POR_ATENDER,
  })
  estado: EstadoEnum;

  @OneToOne(() => Usuario, (usuario) => usuario.codigo_de_trabajador)
  vendedor: Usuario;

  @OneToOne(() => Usuario, (usuario) => usuario.codigo_de_trabajador)
  repartidor: Usuario;

  @OneToOne(() => Producto, (producto) => producto.pedido)
  productos: Producto[];

  @BeforeInsert()
  async generateCustomId() {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const currentMaxId = await queryRunner.manager
        .createQueryBuilder(Usuario, 'entity')
        .select('MAX(CAST(entity.codigo_de_trabajador AS INTEGER))', 'maxId')
        .getRawOne();

      const nextId = generateCustomId(currentMaxId.maxId || 0);

      this.numero_de_pedido = nextId;

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export function generateCustomId(currentMaxId: number): string {
  const idNumber = currentMaxId + 1;
  return idNumber.toString().padStart(3, '0');
}
