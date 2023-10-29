import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum RolEnum {
  ENCARGADO = 0,
  VENDEDOR = 1,
  DELIVERY = 2,
  REPARTIDOR = 3,
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
  password: string;

  @Column()
  telefono: number;

  @Column({
    type: 'enum',
    enum: RolEnum,
    default: RolEnum.ENCARGADO,
  })
  rol: RolEnum.ENCARGADO;

  @Column()
  puesto: string;
  username: any;
}
