import crypto from 'crypto';
import {
Entity,
Column,
Index,
BeforeInsert,
OneToMany,
PrimaryGeneratedColumn,
OneToOne,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Pedido } from '../models/Pedido';

export enum RolEnum {
ENCARGADO = 'Encargado',
VENDEDOR = 'Vendedor',
DELIVERY = 'Delivery',
REPARTIDOR = 'Repartidor',
}

@Entity('usuarios')
export class Usuario {
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

@OneToOne(() => Pedido, (pedido) => pedido.user)
pedido: Pedido[];

@BeforeInsert()
async hashPassword() {
this.password = await bcrypt.hash(this.password, 12);
}

static async comparePasswords(
candidatePassword: string,
hashedPassword: string
) {
return await bcrypt.compare(candidatePassword, hashedPassword);
}

static createVerificationCode() {
const verificationCode = crypto.randomBytes(32).toString('hex');

    const hashedVerificationCode = crypto
      .createHash('sha256')
      .update(verificationCode)
      .digest('hex');

    return { verificationCode, hashedVerificationCode };

}

toJSON() {
return {
...this,
password: undefined,
verified: undefined,
verificationCode: undefined,
};
}
}
