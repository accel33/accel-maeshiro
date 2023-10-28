import { Request } from 'express';
import { RolEnum } from '../entities/Usuario';

export interface UsuarioRequest extends Request {
  nombre: string;
  email: string;
  telefono: string;
  rol: RolEnum;
  puesto: string;
}
