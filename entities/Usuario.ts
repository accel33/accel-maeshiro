import {
  Entity,
  Column,
  BaseEntity,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { AppDataSource } from '../config/data-source';

export enum RolEnum {
  ENCARGADO = 'Encargado',
  VENDEDOR = 'Vendedor',
  DELIVERY = 'Delivery',
  REPARTIDOR = 'Repartidor',
}

@Entity('usuarios')
export class Usuario extends BaseEntity {
  @PrimaryColumn()
  codigo_de_trabajador: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telefono: number;

  @Column({
    type: 'enum',
    enum: RolEnum,
    default: RolEnum.ENCARGADO,
  })
  rol: RolEnum;

  @Column()
  puesto: string;
  username: any;

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

      this.codigo_de_trabajador = nextId;

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
