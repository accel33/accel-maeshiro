import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Usuario } from './Usuario';
import { Producto } from './Producto';

export enum EstadoEnum {
  POR_ATENDER = 'Por atender',
  EN_PROCESO = 'En proceso',
  DELIVERY = 'Delivery',
  RECIBIDO = 'Recibido',
}

@Entity('pedidos')
export class Pedido extends BaseEntity {
  // @PrimaryColumn()
  @PrimaryGeneratedColumn('identity')
  numeroPedido: string;

  @Column({ type: 'timestamptz', nullable: true })
  fechaPedido: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fechaRecepcion: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fechaDespacho: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fechaEntrega: Date;

  @Column({
    type: 'enum',
    enum: EstadoEnum,
    default: EstadoEnum.POR_ATENDER,
  })
  estado: EstadoEnum;

  @ManyToOne(() => Usuario, (usuario) => usuario.codigoTrabajador)
  @JoinColumn()
  vendedor: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.codigoTrabajador)
  @JoinColumn()
  repartidor: Usuario;

  @OneToMany(() => Producto, (producto) => producto.pedido)
  @JoinColumn()
  productos: Producto[];
}
//   @BeforeInsert()
//   async generateCustomId() {
//     const queryRunner = AppDataSource.createQueryRunner();

//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const currentMaxId = await queryRunner.manager
//         .createQueryBuilder(Pedido, 'entity')
//         .select('MAX(CAST(entity.numero_de_pedido AS INTEGER))', 'maxId')
//         .getRawOne();

//       const nextId = generateCustomId(currentMaxId.maxId || 0);

//       this.numero_de_pedido = nextId;

//       await queryRunner.commitTransaction();
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }

// export function generateCustomId(currentMaxId: number): string {
//   const idNumber = currentMaxId + 1;
//   return idNumber.toString().padStart(3, '0');
// }
