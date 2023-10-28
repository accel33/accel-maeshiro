import { RolEnum } from '../entities/Usuario';

interface UsuarioDto {
  codigo_de_trabajador: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: RolEnum;
  puesto: string;
}
