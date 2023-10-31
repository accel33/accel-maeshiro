import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  BeforeInsert,
  PrimaryColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Pedido } from './Pedido';
import { AppDataSource } from '../config/dataSource';

@Entity('productos')
@Unique(['sku', 'pedido'])
export class Producto extends BaseEntity {
  @PrimaryColumn({ unique: true })
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
  unidadMedida: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.productos)
  pedido: Pedido | null;

  @BeforeInsert()
  async generateCustomId() {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const currentMaxId = await queryRunner.manager
        .createQueryBuilder(Producto, 'entity')
        .select('MAX(CAST(entity.sku AS INTEGER))', 'maxId')
        .getRawOne();

      const nextId = generateCustomId(currentMaxId.maxId || 0);

      this.sku = nextId;

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
