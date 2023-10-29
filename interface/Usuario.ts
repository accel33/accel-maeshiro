import { RolEnum } from '../entities/Usuario';

export interface Usuario {
  nombre: string;
  password: string;
  email: string;
  telefono: string;
  rol: RolEnum;
  puesto: string;
}
